from pydantic import BaseModel

class GroupPostRequest(BaseModel):
    name: str

class AddSuperUserRequest(BaseModel):
    users:list[str]
