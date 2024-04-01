from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.future import select
from sqlalchemy.orm import Session

from app.cruds.auth import check_privilege, get_current_active_user
from app.cruds.response import group_user_display
from app.database import get_db
from app.models.models import Group, GroupUser, User
from app.schemas.users import GroupUsers, UserAddRequest, UserDisplay, UserRoleChange

router = APIRouter()


@router.get("/", response_model=GroupUsers)
async def group_user_list(
    group_id: str,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_active_user),
):
    check_privilege(group_id, user.id, "normal")
    users = [group_user_display(user) for user in db.get(Group, group_id).users]
    return {"users": users}


@router.post("/", response_model=UserDisplay)
async def add_user(
    group_id: str,
    request: UserAddRequest,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_active_user),
):
    check_privilege(group_id, user.id, "super")

    target_user = db.scalars(
        select(GroupUser)
        .filter(GroupUser.group_id == group_id, GroupUser.user_id == request.user_id)
        .limit(1)
    ).first()
    if not target_user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="対象のユーザーが見つかりません",
        )

    if target_user.role != "pending":
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT, detail="すでに承認済みのユーザーです"
        )

    target_user.role = "normal"
    db.commit()
    db.refresh(target_user)
    return group_user_display(target_user)


@router.post("/join", response_model=UserDisplay)
async def request_join_group(
    group_id: str,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_active_user),
):
    group_user = db.scalars(
        select(GroupUser)
        .filter(GroupUser.group_id == group_id, GroupUser.user_id == user.id)
        .limit(1)
    ).first()
    if group_user:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT, detail="すでに所属しています"
        )

    group = db.get(Group, group_id)
    group_user = GroupUser(user_id=user.id, group_id=group_id)
    group.users.append(group_user)
    db.commit()
    db.refresh(group_user)
    return group_user_display(group_user)


@router.delete("/{user_id}")
async def delete_groupuser(
    group_id: str,
    user_id: str,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_active_user),
):
    check_privilege(group_id, user.id, "super")

    target_user = db.scalars(
        select(GroupUser)
        .filter(GroupUser.group_id == group_id, GroupUser.user_id == user_id)
        .limit(1)
    ).first()
    if not target_user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="対象のユーザーが見つかりません",
        )
    db.delete(target_user)
    db.commit()
    return {"status": "success"}


@router.patch("/{user_id}/role", response_model=UserDisplay)
async def change_user_role(
    group_id: str,
    user_id: str,
    request: UserRoleChange,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_active_user),
):
    check_privilege(group_id, user.id, "super")

    target_user = db.scalars(
        select(GroupUser)
        .filter(GroupUser.group_id == group_id, GroupUser.user_id == user_id)
        .limit(1)
    ).first()
    if not target_user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="対象のユーザーが見つかりません",
        )
    target_user.role = request.role
    db.commit()
    db.refresh(target_user)
    return group_user_display(target_user)
