from uuid import UUID
from pydantic import BaseModel
from app.models.models import Role

class UserDisplay(BaseModel):
    id: UUID
    name: str
    room_number: str
    point: int
    role: Role
    is_active: bool

class GroupUsers(BaseModel):
    users:list[UserDisplay]

class UserAddRequest(BaseModel):
    user_id: str