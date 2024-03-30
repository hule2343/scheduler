import datetime

from fastapi import HTTPException, status
from sqlalchemy import update
from sqlalchemy.future import select
from sqlalchemy.orm import Session

from app.cruds.response import (
    slot_response,
    slots_response,
    user_response,
)
from app.models.models import GroupUser, Slot, Task, User
from app.schemas.slot import SlotCreate


def all(db: Session):
    items = db.scalars(select(Slot)).all()

    return slots_response(items)


def slot_finished(db: Session):
    item = (
        db.execute(select(Slot).filter(Slot.end_time < datetime.datetime.now()))
        .scalars()
        .all()
    )
    return slots_response(item)


def get(name: str, db: Session):
    item = db.scalars(select(Slot).filter_by(name=name).limit(1)).first()
    respone_slot = slot_response(item)
    return respone_slot


def post(slot: SlotCreate, db: Session, user: User):
    task = db.get(Task, slot.task_id)
    if not task:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST)
    new_slot = Slot(
        name=slot.name,
        start_time=datetime.datetime.fromisoformat(slot.start_time),
        end_time=datetime.datetime.fromisoformat(slot.end_time),
        task_id=slot.task_id,
        creater_id=user.id,
    )
    db.add(new_slot)
    db.commit()
    db.refresh(new_slot)
    return new_slot


def patch(request: SlotCreate, slot_id: str, db: Session):
    slot = db.get(Slot, slot_id)
    if not slot:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"No note with this id: {slot_id} found",
        )
    task = db.get(Task, request.task_id)
    if not task:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
        )
    db.execute(
        update(Slot)
        .where(Slot.id == slot_id)
        .values(
            name=request.name if request.name else slot.name,
        )
        .execution_options(synchronize_session="evaluate")
    )
    slot.start_time = datetime.datetime.fromisoformat(request.start_time)
    slot.end_time = datetime.datetime.fromisoformat(request.end_time)
    slot.task = task
    db.commit()
    db.refresh(slot)
    return slot


def assign(slot_id: str, user_id: str, db: Session):
    slot = db.get(Slot, slot_id)
    user = db.get(User, user_id)
    if not slot or not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
    if slot.end_time < datetime.datetime.now():
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN)

    exp_assignees = filter(lambda x: slot.task in x.exp_tasks, slot.assignees)
    if len(slot.assignees) + 1 > slot.task.max_worker_num:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN)
    if (slot.task not in user.exp_tasks) and slot.task.max_worker_num - len(
        slot.assignees
    ) + len(exp_assignees) <= slot.task.exp_worker_num:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN)
    slot.assignees.append(user)
    db.commit()
    db.refresh(slot)
    return slot


def complete(group_id, slot_id: str, done: bool, user: User, db: Session):
    slot = db.get(Slot, slot_id)
    if slot.start_time > datetime.datetime.now():
        raise HTTPException(status_code=status.HTTP_406_NOT_ACCEPTABLE)
    slots = user.slots
    if slot not in slots:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN)
    group_user = db.scalars(
        select(GroupUser).filter(
            GroupUser.group_id == group_id, GroupUser.user_id == user.id
        )
    ).first()
    if not group_user:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN)

    slot.assignees.remove(user)
    if done:
        user.exp_tasks.append(slot.task)
        group_user.point += slot.task.point
    db.commit()
    db.refresh(slot)
    return slot


def bulk_delete(group_id: str, slots_id: list[str], db: Session):
    delete_slot = []
    for slot_id in slots_id:
        slot = db.get(Slot, slot_id)
        if not slot:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"id:{slot_id} is not found",
            )
        if slot.task.group_id != group_id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="You don't have permission to delete this slot",
            )
        delete_slot.append({"id": slot.id, "name": slot.name})
        db.delete(slot)
    db.commit()
    return delete_slot


def delete_expired_slots(group_id: str, db: Session):
    slots = db.scalars(
        select(Slot).join(Slot.task).filter(Task.group_id == group_id)
    ).all()
    expired_slots = []
    for slot in slots:
        if slot.end_time < datetime.datetime.now() and slot.assignees == []:
            expired_slots.append({"id": slot.id, "name": slot.name})
            db.delete(slot)
    db.commit()
    return expired_slots
