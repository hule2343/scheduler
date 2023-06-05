from sqlalchemy import String, Column, Table, ForeignKey
from app.database import Base
from typing import Optional
from sqlalchemy.orm import relationship, mapped_column, Mapped
import uuid
from uuid import uuid4
from datetime import datetime, time
import enum

tag_table = Table(
    "tasktag_table",
    Base.metadata,
    Column("task", ForeignKey("task.id"), primary_key=True),
    Column("tasktag", ForeignKey("tasktag.id"), primary_key=True),
)

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


class Bid(Base):
    __tablename__ = "bid"
    id: Mapped[uuid.UUID] = mapped_column(primary_key=True, default=uuid4)
    name: Mapped[str] = mapped_column(String(20))
    open_time: Mapped[datetime]
    close_time: Mapped[datetime]
    slot_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("slot.id", ondelete="SET NULL")
    )
    slot: Mapped["Slot"] = relationship(back_populates="bid")
    is_complete: Mapped[bool] = mapped_column(default=False)
    bidders: Mapped[Optional[list["Bidder"]]] = relationship(
        back_populates="bid", cascade="all,delete"
    )


class Bidder(Base):
    __tablename__ = "bidder"
    bid_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("bid.id", ondelete="CASCADE"), primary_key=True
    )
    bid: Mapped["Bid"] = relationship(back_populates="bidders")
    user_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("user.id", ondelete="CASCADE"), primary_key=True
    )
    user: Mapped["User"] = relationship(back_populates="bids")
    point: Mapped[int] = mapped_column(default=0)
    is_canceled: Mapped[bool] = mapped_column(default=False)


class Slot(Base):
    __tablename__ = "slot"
    id: Mapped[uuid.UUID] = mapped_column(primary_key=True, default=uuid4)
    name: Mapped[str] = mapped_column(String(20))
    start_time: Mapped[datetime]
    end_time: Mapped[datetime]
    assignees: Mapped[Optional[list["User"]]] = relationship(
        secondary=slots_table, back_populates="slots"
    )
    creater_id: Mapped[Optional[uuid.UUID]] = mapped_column(
        ForeignKey("user.id", ondelete="SET NULL")
    )
    creater: Mapped[Optional["User"]] = relationship(
        back_populates="create_slot"
    )
    task_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("task.id", ondelete="CASCADE")
    )
    task: Mapped["Task"] = relationship(back_populates="slots", uselist=False)
    bid: Mapped[Optional["Bid"]] = relationship(
        back_populates="slot", uselist=False, cascade="all,delete"
    )


class Task(Base):
    __tablename__ = "task"
    id: Mapped[uuid.UUID] = mapped_column(primary_key=True, default=uuid4)
    name: Mapped[str] = mapped_column(String(20))
    detail: Mapped[str] = mapped_column(String(400))
    max_woker_num: Mapped[int] = mapped_column(default=1)  # 最大人数
    min_woker_num: Mapped[int] = mapped_column(default=1)  # 最少人数
    exp_woker_num: Mapped[int] = mapped_column(default=0)  # 必要な経験者の人数
    start_point: Mapped[int] = mapped_column(default=0)
    buyout_point: Mapped[int] = mapped_column(default=0)
    slots: Mapped[list["Slot"] | None] = relationship(
        back_populates="task", cascade="all,delete"
    )
    experts: Mapped[Optional[list["User"]]] = relationship(
        secondary=experience_table, back_populates="exp_tasks"
    )
    creater_id: Mapped[Optional[uuid.UUID]] = mapped_column(
        ForeignKey("user.id", ondelete="SET NULL")
    )
    creater: Mapped[Optional["User"]] = relationship(
        back_populates="create_task"
    )
    tag: Mapped[Optional[list["TaskTag"]]] = relationship(
        secondary=tag_table, back_populates="tasks", lazy="joined"
    )
    group_id:Mapped[uuid.UUID]=mapped_column(
        ForeignKey("group.id",ondelete="SET NULL")
    )
    group:Mapped["Group"]=relationship(
        back_populates="tasks"
    )


class TaskTag(Base):
    __tablename__ = "tasktag"
    id: Mapped[uuid.UUID] = mapped_column(primary_key=True, default=uuid4)
    name: Mapped[str] = mapped_column(String(10))
    tasks: Mapped[Optional[list["Task"]]] = relationship(
        secondary=tag_table, back_populates="tag"
    )


class TaskTemplate(Base):
    __tablebane__ = "tasktemplate"
    id: Mapped[uuid.UUID] = mapped_column(primary_key=True, default=uuid4)
    template_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("template.id", ondelete="CASCADE")
    )
    template: Mapped["Template"] = relationship(back_populates="tasktemplates")
    task_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("task.id", ondelete="CASCADE")
    )
    task: Mapped["Task"] = relationship(back_populates="tasktemplates")
    date_from_start: Mapped[int] = mapped_column(default=0)
    time: Mapped[time]


class Template(Base):
    __tablename__ = "template"
    id: Mapped[uuid.UUID] = mapped_column(primary_key=True, default=uuid4)
    name: Mapped[str] = mapped_column(String(20))
    tasktemplates: Mapped[Optional[list["TaskTemplate"]]] = relationship(
        back_populates="template"
    )


class Group(Base):
    __tablename__ = "group"
    id: Mapped[uuid.UUID] = mapped_column(primary_key=True, default=uuid4)
    users: Mapped[list["GroupUser"]] = relationship(
        back_populates="group",
    )
    tasks: Mapped[list["Task"]] = relationship(
        back_populates="group",
    )


class Role(enum.Enum):
    admin = "admin"
    super = "super"
    normal = "normal"


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
    role: Mapped["Role"]


class User(Base):
    __tablename__ = "user"
    id: Mapped[uuid.UUID] = mapped_column(primary_key=True, default=uuid4)
    name: Mapped[str] = mapped_column(String(20))
    password: Mapped[str] = mapped_column(String(400))
    room_number: Mapped[str] = mapped_column(String(10))
    group: Mapped[list["GroupUser"]] = relationship(
        back_populates="user", cascade="all"
    )
    exp_tasks: Mapped[Optional[list["Task"]]] = relationship(
        secondary=experience_table, back_populates="experts"
    )
    slots: Mapped[Optional[list["Slot"]]] = relationship(
        secondary=slots_table, back_populates="assignees"
    )
    create_slot: Mapped[Optional[list["Slot"]]] = relationship(
        back_populates="creater"
    )
    create_task: Mapped[Optional[list["Task"]]] = relationship(
        back_populates="creater"
    )
    bids: Mapped[Optional[list["Bidder"]]] = relationship(
        back_populates="user", cascade="all"
    )
    is_active: Mapped[bool] = mapped_column(default=True)

    def has_exp(self, task: Task):
        return task in self.exp_tasks
