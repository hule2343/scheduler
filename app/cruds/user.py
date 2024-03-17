import datetime

from sqlalchemy import delete
from sqlalchemy.future import select
from sqlalchemy.orm import Session

from app.cruds.auth import get_password_hash, verify_password
from app.cruds.response import slots_response, tasks_response, user_response
from app.models.models import Slot, Task, User
from app.schemas.users import AdminUserCreate, UserCreate


def all(db: Session):
    items = db.scalars(select(User)).all()
    response_users = [
        {
            "id": user.id,
            "name": user.name,
            "room_number": user.room_number,
            "is_active": user.is_active,
        }
        for user in items
    ]
    return response_users


def get(name: str, db: Session):
    item = db.scalars(select(User).filter_by(name=name).limit(1)).first()
    response_user = user_response(item)
    return response_user


def create_admin(user: AdminUserCreate, db: Session):
    user.password = get_password_hash(user.password)
    user = User(
        name=user.name,
        password=user.password,
        room_number=user.room_number,
        is_admin=user.is_admin,
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


def register(user: UserCreate, db: Session):
    user.password = get_password_hash(user.password)
    user = User(
        name=user.name,
        password=user.password,
        room_number=user.room_number,
    )
    if user.exp_task:
        for exp_task in user.exp_task:
            task = db.get(Task, exp_task)
            user.exp_task.append(task)
    db.add(user)
    db.commit()
    db.refresh(user)
    response_user = user_response(user)
    return response_user


def delete(name: str, db: Session):
    db.execute(delete(User).where(User.name == name))
    db.commit()
    return name


def add_user_exp_task(request, user: User, db: Session):
    user = db.get(User, user.id)
    for task_id in request.exp_task:
        task = db.get(Task, task_id)
        user.exp_task.append(task)
    db.commit()
    return user_response(user)


def createslots(user_id: str, db: Session):
    user = db.get(User, user_id)
    slots = user.create_slot
    return slots_response(slots)


def createtask(user_id: str, db: Session):
    user = db.get(User, user_id)
    tasks = user.create_task
    return tasks_response(tasks)


def endslots(user_id: str, db: Session):
    slots = db.get(User, user_id).slots
    response_slots = [slot for slot in slots if slot.end_time < datetime.datetime.now()]
    return slots_response(response_slots)


def slots(user_id: str, db: Session):
    slots = db.get(User, user_id).slots
    response_slots = [slot for slot in slots if slot.end_time > datetime.datetime.now()]
    return slots_response(response_slots)


def patch(user_id: str, request: UserUpdate, db: Session):
    user = db.get(User, user_id)
    if request.name:
        user.name = request.name
    if request.block:
        user.block = request.block
    if request.room_number:
        user.room_number = request.room_number
    if request.old_password:
        if verify_password(request.old_password, user.password):
            if request.password:
                user.password = get_password_hash(request.password)
    db.commit()
    return user_response(user)
