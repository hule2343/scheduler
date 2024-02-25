from typing import Any, Dict
from uuid import UUID

from pydantic import BaseModel, Field


class TaskBase(BaseModel):
    name: str = Field(max_length=20)
    detail: str = Field(max_length=400)


class TaskCreate(BaseModel):
    name: str = Field(max_length=20)
    detail: str = Field(max_length=400)
    max_woker_num: int = Field(default=1, gt=1)
    min_woker_num: int = Field(default=1, gt=0)
    exp_woker_num: int = Field(default=0, gt=0)
    point: int = Field(0, gt=0)


class Task(TaskBase):
    id: UUID
    creater_id: UUID
    creater: Any = None
    slot: list[Dict] = []
    expert: list[Dict] = []

    class Config:
        orm_mode = True


class TaskList(TaskBase):
    id: UUID
    create_id: UUID

    class Config:
        orm_mode = True


class TaskUpdate(BaseModel):
    name: str | None = Field(default=None, max_length=20)
    detail: str | None = Field(default=None, max_length=400)
    max_woker_num: int | None = Field(default=None, gt=1)
    min_woker_num: int | None = Field(default=None, gt=0)
    exp_woker_num: int | None = Field(default=None, gt=0)
    start_point: int | None
    buyout_point: int | None

    class Config:
        orm_mode = True
