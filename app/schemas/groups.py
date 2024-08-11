from uuid import UUID

from pydantic import BaseModel


class Role(BaseModel):
    id: UUID
    name: str


class GroupDisplay(BaseModel):
    id: UUID
    name: str
    role: list[Role]|None

class GroupsDisplay(BaseModel):
    groups: list[GroupDisplay]

    class Config:
        from_attributes=True