from fastapi import APIRouter, Depends
from sqlalchemy.future import select
from sqlalchemy.orm import Session
from app.cruds import auth
from app.cruds import task as crud
from app.cruds.response import task_display
from app.database import get_db
from app.models.models import Task, User
from app.schemas.task import TaskCreate, TaskDisplay, TaskList

router = APIRouter()


@router.get("/", response_model=TaskList)
async def task_get(group_id: str, db: Session = Depends(get_db)):
    return {
        "tasks": [
            task_display(task)
            for task in db.scalars(select(Task).filter(Task.group_id == group_id)).all()
        ],
    }


@router.post("/", response_model=TaskDisplay)
async def task_post(
    group_id: str,
    task: TaskCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(auth.get_current_active_user),
):
    auth.check_privilege(group_id, current_user.id, "edit_task", db)
    task = Task(
        name=task.name,
        detail=task.detail,
        max_worker_num=task.max_worker_num,
        min_worker_num=task.min_worker_num,
        exp_worker_num=task.exp_worker_num,
        point=task.point,
        duration=task.duration,
        creater_id=current_user.id,
        group_id=group_id,
    )
    db.add(task)
    db.commit()
    db.refresh(task)
    return task_display(task)


@router.get("/{task_id}", response_model=TaskDisplay)
async def task_get_id(
    group_id: str,
    task_id: str,
    user: User = Depends(auth.get_current_active_user),
    db: Session = Depends(get_db),
):
    auth.check_privilege(group_id, user.id, "normal", db)
    task = db.get(Task, task_id)
    return task_display(task)


@router.patch("/{task_id}", response_model=TaskDisplay)
async def task_patch(
    group_id: str,
    task_id: str,
    task: TaskCreate,
    user: User = Depends(auth.get_current_active_user),
    db: Session = Depends(get_db),
):
    auth.check_privilege(group_id, user.id, "edit_task", db)
    task = crud.patch(task, task_id, db)
    return task_display(task)


@router.delete("/{task_id}", response_model=TaskDisplay)
async def task_delete(
    group_id: str,
    task_id: str,
    user: User = Depends(auth.get_current_active_user),
    db: Session = Depends(get_db),
):
    auth.check_privilege(group_id, user.id, "edit_task", db)
    task = db.get(Task, task_id)
    db.delete(task)
    db.commit()
    return task_display(task)
