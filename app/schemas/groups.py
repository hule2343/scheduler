from enum import Enum
from uuid import UUID

from pydantic import BaseModel


class Role(str, Enum):
    super = "super"
    normal = "normal"
    pending = "pending"


class GroupDisplay(BaseModel):
    id: UUID
    name: str
    role: Role|None

class GroupsDisplay(BaseModel):
    groups: list[GroupDisplay]

    class Config:
        from_attributes=True