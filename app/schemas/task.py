from datetime import timedelta
from uuid import UUID

from pydantic import BaseModel, Field, root_validator


class TaskBase(BaseModel):
    name: str = Field(max_length=20)
    detail: str = Field(max_length=400)
    max_worker_num: int = Field(default=1, gte=1)
    min_worker_num: int = Field(default=1, gte=0)
    exp_worker_num: int = Field(default=0, gte=0)
    point: int = Field(0, gt=0)
    @root_validator(pre=True)
    def validate_worker_num(cls, values):
        if int(values["max_worker_num"]) < int(values["min_worker_num"]):
            raise ValueError("Be sure that the max worker is greater than min worker.")
        if int(values["exp_worker_num"]) > int(values["min_worker_num"]):
            raise ValueError("Be sure that the exp worker is less than min worker.")
        return values

class TaskCreate(TaskBase):
    duration: timedelta



class TaskDisplay(TaskBase):
    id: UUID
    creater_id: UUID
    creater_name: str
    group_id: UUID
    duration: int

    class Config:
        from_attributes = True


class TaskList(BaseModel):
    tasks: list[TaskDisplay]

    class Config:
        from_attributes = True
