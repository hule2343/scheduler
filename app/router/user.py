from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.future import select
from sqlalchemy.orm import Session

from app.cruds.auth import check_privilege, get_current_active_user
from app.cruds.response import group_user_display
from app.database import get_db
from app.models.models import Group, GroupUser, User,Role
from app.schemas.users import GroupUsers, UsersAddRequest, UserDisplay, UserRolesChange

router = APIRouter()


@router.get("/", response_model=GroupUsers)
async def group_user_list(
    group_id: str,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_active_user),
):
    check_privilege(group_id, user.id, "normal",db)
    group=db.get(Group, group_id)
    users = [group_user_display(user) for user in group.users]
    return {"users": users}


@router.post("/", response_model=GroupUsers)
async def add_users(
    group_id: str,
    request: UsersAddRequest,
    db:Session = Depends(get_db),
    user: User = Depends(get_current_active_user),
):
    check_privilege(group_id, user.id, "add_user",db)
    group = db.get(Group, group_id)
    for user_id in request.user_ids:
        target_user = db.scalars(
            select(GroupUser)
            .filter(GroupUser.group_id == group_id, GroupUser.user_id == user_id)
            .limit(1)
        ).first()
        if not target_user:
            target_user = GroupUser(user_id=user_id, group_id=group_id)
            group.users.append(target_user)
    db.commit()
    db.refresh(group)
    return {"users": [group_user_display(user) for user in group.users]}


@router.delete("/{user_id}")
async def delete_groupuser(
    group_id: str,
    user_id: str,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_active_user),
):
    check_privilege(group_id, user.id, "remove_user",db)

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
    request: UserRolesChange,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_active_user),
):
    check_privilege(group_id, user.id, "change_user_role",db)

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
    new_roles = []
    for role_id in request.role_ids:
        role=db.get(Role, role_id)
        if not role:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="対象のロールが見つかりません",
            )
        new_roles.append(role)
    target_user.roles= new_roles
    db.commit()
    db.refresh(target_user)
    return group_user_display(target_user)
