import app.cruds.user as crud
from fastapi import APIRouter, Depends
from app.database import get_db
from sqlalchemy.orm import Session
from app.models.models import User
from app.schemas.users import UserDisplay, AddUserTask, UserUpdate
from app.router.auth import Token
from app.cruds.auth import oauth2_scheme, get_current_active_user

router = APIRouter()


@router.get("/", response_model=UserDisplay | list[UserDisplay])
async def user_get_by_name(
    name: str | None = None, db: Session = Depends(get_db)
):
    if name:
        user = crud.get(name, db)
        return user
    users = crud.all(db)
    return users


@router.get("/{user_id}", response_model=UserDisplay)
async def user_one(
    user_id,
    db: Session = Depends(get_db),
    token: Token = Depends(oauth2_scheme),
):
    user = db.get(User, user_id)
    return user


@router.get("/{user_id}/createslot")
async def user_createslot(
    user_id: str,
    db: Session = Depends(get_db),
):
    slots = crud.createslots(user_id, db)
    return slots


@router.get("/{user_id}/createtask")
async def user_createtask(
    user_id: str,
    db: Session = Depends(get_db),
):
    tasks = crud.createtask(user_id, db)
    return tasks


@router.get("/{user_id}/slots")
async def user_slots(
    user_id: str,
    end: bool | None = None,
    db: Session = Depends(get_db),
):
    if end:
        slots = crud.endslots(user_id, db)
        return slots
    slots = crud.slots(user_id, db)
    return slots


@router.patch("/{user_id}")
async def user_patch(
    user_id: str, request: UserUpdate, db: Session = Depends(get_db)
):
    user = crud.patch(user_id, request, db)
    return user


@router.delete("/", status_code=200)
async def user_delete(name: str, db: Session = Depends(get_db)):
    crud.delete(name, db)
    return {"name": name}


@router.patch("/task")
async def add_user_exp_task(
    request: AddUserTask,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_active_user),
):
    user = crud.add_user_exp_task(request, user, db)
    return user
