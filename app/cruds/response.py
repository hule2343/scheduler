from app.models.models import User
from app.models.models import Slot, Task, Template, GroupUser
from sqlalchemy.orm import Session
from datetime import datetime


def datetime_response(datetime: datetime):
    return {
        "year": datetime.year,
        "month": datetime.month,
        "day": datetime.day,
        "hour": datetime.hour,
        "minute": datetime.minute,
    }



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
        "max_worker_num": task.max_worker_num,
        "min_worker_num": task.min_worker_num,
        "exp_worker_num": task.exp_worker_num,
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
            "max_worker_num": task.max_worker_num,
            "min_worker_num": task.min_worker_num,
            "exp_worker_num": task.exp_worker_num,
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
        "tasks": [
            {"id": task.task_id, "name": task.task.name}
            for task in template.tasktemplates
        ],
    }
    return response_template


def templates_response(templates: list[Template]):
    response_templates = [
        template_response(template) for template in templates
    ]
    return response_templates
