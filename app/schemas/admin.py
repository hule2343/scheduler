from pydantic import BaseModel


class GroupPostRequest(BaseModel):
    name: str

    class Config:
        from_attributes = True


class AddUserRequest(BaseModel):
    users: list[str]

    class Config:
        from_attributes = True
