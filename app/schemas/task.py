from uuid import UUID

from pydantic import BaseModel, Field


class TaskBase(BaseModel):
    name: str = Field(max_length=20)
    detail: str = Field(max_length=400)


class TaskCreate(TaskBase):
    max_woker_num: int = Field(default=1, gt=1)
    min_woker_num: int = Field(default=1, gt=0)
    exp_woker_num: int = Field(default=0, gt=0)
    point: int = Field(0, gt=0)


class TaskDisplay(TaskCreate):
    id: UUID
    creater_id: UUID
    creater_name: str
    group_id: UUID

    class Config:
        from_attributes = True


class TaskList(TaskBase):
    tasks: list[TaskDisplay]

    class Config:
        from_attributes = True
