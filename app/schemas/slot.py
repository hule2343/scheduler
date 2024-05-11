import datetime
from uuid import UUID

from pydantic import BaseModel, Field, root_validator


class SlotCreate(BaseModel):
    name: str = Field(max_length=20)
    start_time: datetime.datetime
    end_time: datetime.datetime
    task_id: UUID

    class Config:
        from_attributes = True

    @root_validator(pre=True)
    def validate_event_schedule(cls, values):
        _begin: datetime.datetime = values["start_time"]
        _end: datetime.datetime = values["end_time"]

        if _begin >= _end:
            raise ValueError("Be sure that the start time is before the end time.")
        return values


class SlotDeleteRequest(BaseModel):
    slots_id: list[UUID]


class Assignee(BaseModel):
    id: UUID
    name: str


class SlotDisplay(SlotCreate):
    id: UUID
    creater_id: UUID
    creater_name: str
    assignees: list[Assignee] = []
    task_name: str

    class Config:
        from_attributes = True


class SlotList(BaseModel):
    slots: list[SlotDisplay]

    class Config:
        from_attributes = True


class SlotDelete(BaseModel):
    slots: list[UUID]

    class Config:
        from_attributes = True
