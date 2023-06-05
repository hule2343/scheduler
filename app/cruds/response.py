from app.models.models import User
from app.models.models import Slot, Bidder, Bid, Task, Template, GroupUser
from sqlalchemy.orm import Session
from sqlalchemy.future import select
from datetime import datetime


def datetime_response(datetime: datetime):
    return {
        "year": datetime.year,
        "month": datetime.month,
        "day": datetime.day,
        "hour": datetime.hour,
        "minute": datetime.minute,
    }


def bid_response(bid: Bid):
    response = {
        "id": bid.id,
        "name": bid.name,
        "open_time": datetime_response(bid.open_time),
        "close_time": datetime_response(bid.close_time),
        "slot": {
            "id": bid.slot_id,
            "name": bid.slot.name,
            "start_time": datetime_response(bid.slot.start_time),
            "end_time": datetime_response(bid.slot.end_time),
            "assignees": [
                {"id": user.id, "name": user.name}
                for user in bid.slot.assignees
            ],
        },
        "start_point": bid.slot.task.start_point,
        "buyout_point": bid.slot.task.buyout_point,
        "is_complete": bid.is_complete,
    }
    return response


def bids_response(bids: list[Bid]):
    respone_bids = [bid_response(bid) for bid in bids]
    return respone_bids


def bids_with_name_response(bids: list[Bid]):
    response = [
        {
            "id": bid.id,
            "name": bid.name,
        }
        for bid in bids
    ]

    return response


def bids_for_user_response(bids: list[Bid], user: User, db: Session):
    respone_bids = bids_response(bids)
    for bid in respone_bids:
        bidder = db.scalars(
            select(Bidder)
            .filter(Bidder.bid_id == bid["id"], Bidder.user_id == user.id)
            .join(Bid.bidders)
            .order_by(Bidder.point)
            .limit(1)
        ).first()
        if bidder is None:
            bid["user_bidpoint"] = "notyet"
        else:
            bid["user_bidpoint"] = bidder.point
    return respone_bids


def bidder_response(bidder: Bidder):
    response = {
        "id": bidder.bid_id,
        "name": bidder.bid.name,
        "user_id": bidder.user_id,
        "user": bidder.user.name,
        "point": bidder.point,
    }
    return response


def bidders_response(bidder: list[Bidder]):
    response = [
        {
            "id": bidder.bid_id,
            "name": bidder.bid.name,
            "user_id": bidder.user_id,
            "user": bidder.user.name,
            "point": bidder.point,
        }
        for bidder in bidder
    ]
    return response


def slot_response(slot: Slot):
    response = {
        "id": slot.id,
        "name": slot.name,
        "start_time": datetime_response(slot.start_time),
        "end_time": datetime_response(slot.end_time),
        "assignees": [
            {"id": user.id, "name": user.name} for user in slot.assignees
        ],
        "creater": creater_response(slot.creater),
        "task": task_response(slot.task),
    }
    return response


def slots_response(slots: list[Slot]):
    response = [slot_response(slot) for slot in slots]
    return response


def task_response(task: Task):
    response_task = {
        "id": task.id,
        "name": task.name,
        "detail": task.detail,
        "max_worker_num": task.max_woker_num,
        "min_worker_num": task.min_woker_num,
        "exp_worker_num": task.exp_woker_num,
        "start_point": task.start_point,
        "buyout_point": task.buyout_point,
        "creater_id": task.creater_id,
        "creater": task.creater.name,
    }
    return response_task


def tasks_response(tasks: list[Task]):
    response_tasks = [
        {
            "id": task.id,
            "name": task.name,
            "detail": task.detail,
            "max_worker_num": task.max_woker_num,
            "min_worker_num": task.min_woker_num,
            "exp_worker_num": task.exp_woker_num,
            "start_point": task.start_point,
            "buyout_point": task.buyout_point,
            "creater_id": task.creater_id,
            "creater": task.creater.name,
        }
        for task in tasks
    ]

    return response_tasks


def groupusers_response(groupuser: list[GroupUser]):
    response = [
        {
            "id": gu.group.id,
            "name": gu.group.name,
            "point": gu.point,
            "role": gu.role,
        }
        for gu in groupuser
    ]
    return response


def user_response(user: User):
    response_user = {
        "id": user.id,
        "name": user.name,
        "group": groupusers_response(user.group),
        "room_number": user.room_number,
        "exp_task": tasks_response(user.exp_tasks),
        "slots": [{"id": slot.id, "name": slot.name} for slot in user.slots],
        "create_slot": [
            {"id": slot.id, "name": slot.name} for slot in user.create_slot
        ],
        "create_task": [
            {"id": slot.id, "name": slot.name} for slot in user.create_task
        ],
        "point": user.point,
        "bid": [
            {"id": bidder.bid_id, "name": bidder.bid.name}
            for bidder in user.bids
        ],
        "is_active": user.is_active,
    }
    return response_user


def creater_response(user: User):
    response_user = {
        "id": user.id,
        "name": user.name,
        "room_number": user.room_number,
    }
    return response_user


def users_response(users: list[User]):
    response_users = [
        {
            "id": user.id,
            "name": user.name,
            "room_number": user.room_number,
            "point": user.point,
            "is_active": user.is_active,
        }
        for user in users
    ]
    return response_users


def template_response(template: Template):
    response_template = {
        "id": template.id,
        "name": template.name,
        "tasks": [{"id":task.task_id,"name":task.task.name} for task in template.tasktemplates]
    }
    return response_template


def templates_response(templates: list[Template]):
    response_templates = [
        template_response(template) for template in templates
    ]
    return response_templates
