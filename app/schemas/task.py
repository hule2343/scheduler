from uuid import UUID

from pydantic import BaseModel, Field


class TaskBase(BaseModel):
    name: str = Field(max_length=20)
    detail: str = Field(max_length=400)


class TaskCreate(TaskBase):
    max_worker_num: int = Field(default=1, gte=1)
    min_worker_num: int = Field(default=1, gte=0)
    exp_worker_num: int = Field(default=0, gte=0)
    point: int = Field(0, gt=0)


class TaskDisplay(TaskCreate):
    id: UUID
    creater_id: UUID
    creater_name: str
    group_id: UUID

    class Config:
        from_attributes = True


class TaskList(BaseModel):
    tasks: list[TaskDisplay]

    class Config:
        from_attributes = True
