import datetime
from fastapi import HTTPException, status
from app.models.models import User
from app.schemas.slot import SlotCreate
from app.models.models import Slot, Bidder, Task
from sqlalchemy.orm import Session
from app.cruds.response import (
    slots_response,
    slot_response,
    user_response,
)
from sqlalchemy.future import select
from sqlalchemy import update


def all(db: Session):
    items = db.scalars(select(Slot)).all()

    return slots_response(items)


def slot_finished(db: Session):
    item = (
        db.execute(
            select(Slot).filter(Slot.end_time < datetime.datetime.now())
        )
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
    slot = Slot(
        name=slot.name,
        start_time=datetime.datetime(
            slot.start_time.year,
            slot.start_time.month,
            slot.start_time.day,
            slot.start_time.hour,
            slot.start_time.minute,
        ),
        end_time=datetime.datetime(
            slot.end_time.year,
            slot.end_time.month,
            slot.end_time.day,
            slot.end_time.hour,
            slot.end_time.minute,
        ),
        task_id=slot.task_id,
        creater_id=user.id,
    )
    db.add(slot)
    db.commit()
    db.refresh(slot)
    return slot


def patch(request: SlotUpdate, slot_id: str, db: Session):
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
    slot.start_time = datetime.datetime(
        request.start_time.year,
        request.start_time.month,
        request.start_time.day,
        request.start_time.hour,
        request.start_time.minute,
    )
    slot.end_time = datetime.datetime(
        request.end_time.year,
        request.end_time.month,
        request.end_time.day,
        request.end_time.hour,
        request.end_time.minute,
    )
    slot.task = task
    db.commit()
    return slot_response(slot)




def complete(slot_id: str, done: bool, user: User, db: Session):
    slot = db.get(Slot, slot_id)
    if slot.start_time > datetime.datetime.now():
        raise HTTPException(status_code=status.HTTP_406_NOT_ACCEPTABLE)
    slots = user.slots
    if slot not in slots:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN)
    bid = slot.bid
    bidder = db.scalars(
        select(Bidder)
        .filter(Bidder.bid_id == bid.id, Bidder.user_id == user.id)
        .limit(1)
    ).first()
    slot.assignees.remove(user)
    if done:
        user.exp_tasks.append(slot.task)
        user.point += bidder.point
    db.commit()
    return user_response(user)


def bulk_delete(slots_id: list[str], db: Session):
    for slot_id in slots_id:
        slot = db.get(Slot, slot_id)
        if not slot:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"id:{slot_id} is not found",
            )
        db.delete(slot)
    db.commit()
    return


def delete_prune_slots(db: Session):
    prune_slots = []
    slots = db.scalars(select(Slot)).all()
    for slot in slots:
        if slot.bid == None:
            prune_slots.append({"id": slot.id, "name": slot.name})
            db.delete(slot)
    db.commit()
    return prune_slots


def delete_expired_slots(db: Session):
    slots = db.scalars(select(Slot)).all()
    expired_slots = []
    for slot in slots:
        if (
            slot.end_time < datetime.datetime.now()
            and slot.assignees == []
        ):
            expired_slots.append({"id": slot.id, "name": slot.name})
            db.delete(slot)
    db.commit()
    return expired_slots
