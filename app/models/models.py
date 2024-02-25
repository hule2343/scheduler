import enum
import uuid
from datetime import datetime, time
from uuid import uuid4

from sqlalchemy import Column, ForeignKey, String, Table
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base

experience_table = Table(
    "experience_table",
    Base.metadata,
    Column("user", ForeignKey("user.id"), primary_key=True),
    Column("task", ForeignKey("task.id"), primary_key=True),
)

slots_table = Table(
    "slots_table",
    Base.metadata,
    Column("user", ForeignKey("user.id")),
    Column("slot", ForeignKey("slot.id")),
)


class Slot(Base):
    __tablename__ = "slot"
    id: Mapped[uuid.UUID] = mapped_column(primary_key=True, default=uuid4)
    name: Mapped[str] = mapped_column(String(20))
    start_time: Mapped[datetime]
    end_time: Mapped[datetime]
    assignees: Mapped[None | list["User"]] = relationship(
        secondary=slots_table, back_populates="slots"
    )
    creater_id: Mapped[None | uuid.UUID] = mapped_column(
        ForeignKey("user.id", ondelete="SET NULL")
    )
    creater: Mapped[None | "User"] = relationship(back_populates="create_slot")
    task_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("task.id", ondelete="CASCADE")
    )
    task: Mapped["Task"] = relationship(back_populates="slots", uselist=False)


class Task(Base):
    __tablename__ = "task"
    id: Mapped[uuid.UUID] = mapped_column(primary_key=True, default=uuid4)
    name: Mapped[str] = mapped_column(String(20))
    detail: Mapped[str] = mapped_column(String(400))
    max_worker_num: Mapped[int] = mapped_column(default=1)  # 最大人数
    min_worker_num: Mapped[int] = mapped_column(default=1)  # 最少人数
    exp_worker_num: Mapped[int] = mapped_column(default=0)  # 必要な経験者の人数
    point: Mapped[int] = mapped_column(default=0)
    slots: Mapped[list["Slot"] | None] = relationship(
        back_populates="task", cascade="all,delete"
    )
    experts: Mapped[None | list["User"]] = relationship(
        secondary=experience_table, back_populates="exp_tasks"
    )
    creater_id: Mapped[None | uuid.UUID] = mapped_column(
        ForeignKey("user.id", ondelete="SET NULL")
    )
    creater: Mapped[None | "User"] = relationship(back_populates="create_task")
    tasktemplates: Mapped[None | list["TaskTemplate"]] = relationship(
        back_populates="task"
    )
    group_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("group.id", ondelete="CASCADE")
    )
    group: Mapped["Group"] = relationship(back_populates="tasks")


class TaskTemplate(Base):
    __tablename__ = "tasktemplate"
    id: Mapped[uuid.UUID] = mapped_column(primary_key=True, default=uuid4)
    template_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("template.id", ondelete="CASCADE")
    )
    template: Mapped["Template"] = relationship(back_populates="tasktemplates")
    task_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("task.id", ondelete="SET NULL")
    )
    task: Mapped["Task"] = relationship(back_populates="tasktemplates")
    date_from_start: Mapped[int] = mapped_column(default=0)
    start_time: Mapped[time]
    end_time: Mapped[time]


class Template(Base):
    __tablename__ = "template"
    id: Mapped[uuid.UUID] = mapped_column(primary_key=True, default=uuid4)
    name: Mapped[str] = mapped_column(String(20))
    tasktemplates: Mapped[list["TaskTemplate"] | None] = relationship(
        back_populates="template"
    )


class Group(Base):
    __tablename__ = "group"
    id: Mapped[uuid.UUID] = mapped_column(primary_key=True, default=uuid4)
    name: Mapped[str] = mapped_column(String(20))
    users: Mapped[None | list["GroupUser"]] = relationship(
        back_populates="group",
    )
    tasks: Mapped[None | list["Task"]] = relationship(
        back_populates="group",
    )

class Role(enum.Enum):
    super = "super"
    normal = "normal"
    pending="pending"

class GroupUser(Base):
    __tablename__ = "groupuser"
    group_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("group.id", ondelete="CASCADE"), primary_key=True
    )
    group: Mapped["Group"] = relationship(back_populates="users")
    user_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("user.id", ondelete="CASCADE"), primary_key=True
    )
    user: Mapped["User"] = relationship(back_populates="groups")
    point: Mapped[int] = mapped_column(default=0)
    role: Mapped["Role"]= mapped_column(default=Role.pending)


class User(Base):
    __tablename__ = "user"
    id: Mapped[uuid.UUID] = mapped_column(primary_key=True, default=uuid4)
    name: Mapped[str] = mapped_column(String(20))
    password: Mapped[str] = mapped_column(String(400))
    room_number: Mapped[str] = mapped_column(String(10))
    groups: Mapped[None | list["GroupUser"]] = relationship(
        back_populates="user", cascade="all"
    )
    exp_tasks: Mapped[None | list["Task"]] = relationship(
        secondary=experience_table, back_populates="experts"
    )
    slots: Mapped[None | list["Slot"]] = relationship(
        secondary=slots_table, back_populates="assignees"
    )
    create_slot: Mapped[None | list["Slot"]] = relationship(back_populates="creater")
    create_task: Mapped[None | list["Task"]] = relationship(back_populates="creater")
    is_active: Mapped[bool] = mapped_column(default=True)
    is_admin: Mapped[bool] = mapped_column(default=False)
    def has_exp(self, task: Task):
        return task in self.exp_tasks
