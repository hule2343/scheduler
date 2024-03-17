from uuid import UUID

from pydantic import BaseModel

from app.models.models import Role


class UserBase(BaseModel):
    name: str
    room_number: str


class UserCreate(UserBase):
    password: str
    exp_task: list[UUID]


class UserDisplay(UserBase):
    id: UUID
    point: int
    role: Role
    is_active: bool


class GroupUsers(BaseModel):
    users: list[UserDisplay]


class UserAddRequest(BaseModel):
    user_id: str
