from fastapi import FastAPI
from app.router import (
    admin,
    slot,
    user,
    auth,
    task,
    template,
    message,
)
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()


origins = ["http://localhost:3000", "http://localhost:5432"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"message": "Hello World"}

app.include_router(admin.router, prefix="/admin")
app.include_router(slot.router, prefix="/{group_id}/slots")
app.include_router(task.router, prefix="/{group_id}/tasks")
app.include_router(template.router, prefix="/{group_id}/templates")
app.include_router(user.router, prefix="/{group_id}/users")
app.include_router(auth.router, prefix="")
app.include_router(message.router, prefix="/{group_id}/message")
