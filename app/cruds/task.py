from fastapi import HTTPException, status
from sqlalchemy import update
from sqlalchemy.future import select
from sqlalchemy.orm import Session, joinedload

from app.cruds.response import task_display, tasks_display
from app.models.models import Task,User
from app.schemas.task import TaskCreate



def all(db: Session):
    items = db.scalars(select(Task).options(joinedload(Task.creater))).unique().all()
    return tasks_display(items)


async def task_get(name: str, db: Session):
    item = db.scalars(select(Task).filter_by(name=name).limit(1)).first()
    return item


def post(task: TaskCreate, current_user: User, db: Session):
    task = Task(creater=current_user, **task.dict())
    db.add(task)
    db.commit()
    return task_display(task)


def delete(name: str, db: Session):
    db.scalars(select(Task).filter_by(name=name)).delete()
    db.commit()
    return name


def patch(request: TaskCreate, task_id: str, db: Session):
    task = db.get(Task, task_id)
    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"No note with this id: {task_id} found",
        )

    db.execute(
        update(Task)
        .where(Task.id == task_id)
        .values(
            name=request.name if request.name else task.name,
            detail=request.detail if request.detail else task.detail,
            max_woker_num=request.max_woker_num
            if request.max_woker_num
            else task.max_worker_num,
            min_woker_num=request.min_woker_num
            if request.min_woker_num
            else task.min_worker_num,
            exp_woker_num=request.exp_woker_num
            if request.exp_woker_num
            else task.exp_worker_num,
        )
        .execution_options(synchronize_session="evaluate")
    )
    db.commit()
    return task


