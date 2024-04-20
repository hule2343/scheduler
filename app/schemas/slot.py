from uuid import UUID
from pydantic import BaseModel, Field


class SlotCreate(BaseModel):
    name: str = Field(max_length=20)
    start_time: str
    end_time: str
    task_id: UUID
    class Config:
        from_attributes = True


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
        from_attributes = True

class SlotList(BaseModel):
    slots: list[SlotDisplay]

    class Config:
        from_attributes=True

class SlotDelete(BaseModel):
    slots: list[UUID]
    class Config:
        from_attributes=True