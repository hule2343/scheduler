from pydantic import BaseModel

class GroupPostRequest(BaseModel):
    name: str
    class Config:
        from_attributes = True

class AddSuperUserRequest(BaseModel):
    users:list[str]
    class Config:
        from_attributes = True