from fastapi import APIRouter, Depends
from sqlalchemy.future import select
from sqlalchemy.orm import Session

from app.cruds import auth
from app.cruds import task as crud
from app.database import get_db
from app.models.models import Task, User
from app.schemas.task import TaskCreate, TaskDisplay, TaskList

router = APIRouter()


def task_display(task: Task):
    return {
        "id": task.id,
        "name": task.name,
        "detail": task.detail,
        "max_worker_num": task.max_worker_num,
        "min_worker_num": task.min_worker_num,
        "exp_worker_num": task.exp_worker_num,
        "point": task.point,
        "creater_id": task.creater_id,
        "creater_name": task.creater.name,
        "group_id": task.group_id,
    }


@router.get("/", response_model=TaskList)
async def task_get(group_id: str, db: Session = Depends(get_db)):
    tasks = [
        task_display(task)
        for task in db.scalars(select(Task).filter(Task.group_id == group_id)).all()
    ]
    return {"tasks": tasks}


@router.post("/", response_model=TaskDisplay)
async def task_post(
    group_id: str,
    task: TaskCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(auth.get_current_active_user),
):
    auth.check_privilege(group_id, current_user.id, "super")
    task = Task(
        name=task.name,
        detail=task.detail,
        max_worker_num=task.max_woker_num,
        min_worker_num=task.min_woker_num,
        exp_worker_num=task.exp_woker_num,
        point=task.point,
        creater_id=current_user.id,
        group_id=group_id,
    )
    db.add(task)
    db.commit()
    db.refresh(task)
    return task_display(task)


@router.patch("/{task_id}", response_model=TaskDisplay)
async def task_patch(task_id: str, task: TaskCreate, db: Session = Depends(get_db)):
    task = crud.patch(task, task_id, db)
    return task_display(task)


@router.delete("/{task_id}",response_model=TaskDisplay)
async def task_delete(
    group_id: str,
    task_id: str,
    user: User = Depends(auth.get_current_active_user),
    db: Session = Depends(get_db),
):
    auth.check_privilege(group_id, user.id, "super")
    task = db.get(Task, task_id)
    db.delete(task)
    db.commit()
    return task_display(task)
