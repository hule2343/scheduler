from uuid import UUID
from datetime import datetime
from pydantic import BaseModel, Field
from app.schemas.originaldatetime import DateTime


class SlotCreate(BaseModel):
    name: str = Field(max_length=20)
    start_time: DateTime
    end_time: DateTime
    task_id: UUID
    class Config:
        orm_mode = True


class SlotDeleteRequest(BaseModel):
    slots_id: list[UUID]

class Assignee(BaseModel):
    id: UUID
    name: str

class SlotDisplay(SlotCreate):
    id: UUID
    creater_id: UUID
    creater_name: str
    assignees:list[Assignee]=[]
    task_name: str
    class Config:
        orm_mode = True

class SlotList(BaseModel):
    slots: list[SlotDisplay]

    class Config:
        orm_mode = True

