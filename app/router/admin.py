from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.future import select
from sqlalchemy.orm import Session

from app.cruds.auth import get_admin_user
from app.cruds.response import (
    group_display,
    response_base,
    user_detail_display,
    user_display,
)
from app.cruds.user import create_admin
from app.database import get_db
from app.models.models import Group, GroupUser, Role, User
from app.router.user import group_user_display
from app.schemas.admin import AddSuperUserRequest, GroupPostRequest
from app.schemas.users import AdminUserCreate, AdminUserPatch

router = APIRouter(
    dependencies=[Depends(get_admin_user)],
)


@router.get("/users")
async def admin_user_list(
    db: Session = Depends(get_db),
):
    users = db.scalars(select(User)).all()
    return {"users": [user_display(user) for user in users]}


@router.post("/users")
async def admin_user_register(
    request: AdminUserCreate,
    db: Session = Depends(get_db),
):
    generated_user = create_admin(request, db)
    if not generated_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
        )

    return user_display(generated_user)


@router.get("/users/{user_id}")
async def admin_user_detail(
    user_id: str,
    db: Session = Depends(get_db),
):
    user = db.get(User, user_id)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
        )
    return user_detail_display(user)


@router.patch("/users/{user_id}")
async def admin_user_patch(
    user_id: str,
    request: AdminUserPatch,
    db: Session = Depends(get_db),
):
    user = db.get(User, user_id)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
        )
    user.name = request.name if request.name else user.name
    user.room_number = request.room_number if request.room_number else user.room_number
    user.is_active = (
        request.is_active if request.is_active is not None else user.is_active
    )
    user.is_admin = request.is_admin if request.is_admin is not None else user.is_admin
    db.commit()
    db.refresh(user)
    return user_display(user)


@router.delete("/users/{user_id}")
async def admin_user_delete(
    user_id: str,
    db: Session = Depends(get_db),
):
    user = db.get(User, user_id)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
        )
    db.delete(user)
    db.commit()
    return user_display(user)


@router.get("/groups")
async def group_list(
    db: Session = Depends(get_db),
):
    groups = db.scalars(select(Group)).all()
    return {"groups": [response_base(group) for group in groups]}


@router.post("/groups")
async def create_group(
    request: GroupPostRequest,
    db: Session = Depends(get_db),
):
    group = Group(name=request.name)
    db.add(group)
    db.commit()
    db.refresh(group)
    role = Role(
        name="管理者",
        group_id=group.id,
        add_user=True,
        remove_user=True,
        edit_task=True,
        edit_template=True,
        edit_role=True,
        change_user_role=True,
        edit_slot=True,
        add_slot_from_template=True,
        edit_point=True,
    )
    db.add(role)
    db.commit()
    db.refresh(role)
    return response_base(group)


@router.get("/groups/{group_id}")
async def get_group(
    group_id: str,
    db: Session = Depends(get_db),
):
    group = db.get(Group, group_id)
    if not group:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
        )
    return response_base(group)


@router.patch("/groups/{group_id}")
async def patch_gorup(
    group_id: str, request: GroupPostRequest, db: Session = Depends(get_db)
):
    group = db.get(Group, group_id)
    group.name = request.name
    db.commit()
    db.refresh(group)
    return group


@router.delete("/groups/{group_id}")
async def delete_group(group_id: str, db: Session = Depends(get_db)):
    group = db.get(Group, group_id)
    db.delete(group)
    db.commit()
    return group_display(group)


@router.post("/groups/{group_id}/adduser")
async def create_superuser(
    group_id: str, request: AddSuperUserRequest, db: Session = Depends(get_db)
):
    response_users = []
    for user_id in request.users:
        group_user = db.scalars(
            select(GroupUser).filter_by(user_id=user_id, group_id=group_id).limit(1)
        ).first()
        if not group_user:
            group_user = GroupUser(user_id=user_id, group_id=group_id, is_admin=True)
            db.add(group_user)
            db.commit()
            db.refresh(group_user)
            response_users.append(group_user)
            continue
        group_user.is_owner = True
        db.commit()
        db.refresh(group_user)
        response_users.append(group_user)

    return {"users": [group_user_display(user) for user in response_users]}


@router.post("/groups/{group_id}/user")
async def add_user_to_group(
    group_id: str, request: AddSuperUserRequest, db: Session = Depends(get_db)
):
    response_users = []
    for user_id in request.users:
        group_user = db.scalars(
            select(GroupUser).filter_by(user_id=user_id, group_id=group_id).limit(1)
        ).first()
        if not group_user:
            group_user = GroupUser(user_id=user_id, group_id=group_id)
            db.add(group_user)
            db.commit()
            db.refresh(group_user)
            response_users.append(group_user)
            continue
        response_users.append(group_user)

    return {"users": [group_user_display(user) for user in response_users]}
