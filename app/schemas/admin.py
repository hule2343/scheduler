from pydantic import BaseModel

class GroupPostRequest(BaseModel):
    name: str

class AddSuperUserRequest(BaseModel):
    user_id: str
    group_id: str
