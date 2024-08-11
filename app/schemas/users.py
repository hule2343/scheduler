from uuid import UUID

from pydantic import BaseModel


class UserBase(BaseModel):
    name: str
    room_number: str


class UserCreate(UserBase):
    password: str
    exp_task: list[UUID]


class UserUpdate(UserBase):
    exp_task: list[UUID]


class AdminUserCreate(UserBase):
    password: str
    is_admin: bool

    class Config:
        orm_mode = True


class AdminUserPatch(UserBase):
    is_active: bool
    is_admin: bool


class AdminUserDisplay(UserBase):
    id: UUID
    is_admin: bool


class Role(BaseModel):
    id: UUID
    name: str


class UserDisplay(UserBase):
    id: UUID
    point: int
    role: list[Role]
    is_active: bool


class GroupUsers(BaseModel):
    users: list[UserDisplay]


class UserAddRequest(BaseModel):
    user_id: str


class UsersAddRequest(BaseModel):
    user_ids: list[str]


class UserRolesChange(BaseModel):
    role_ids: list[str]
