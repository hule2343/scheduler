from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.cruds.user import create_admin
from app.database import get_db
from app.models.models import Group, GroupUser, User
from app.router.user import group_user_display
from app.schemas.admin import AddSuperUserRequest, GroupPostRequest
from app.schemas.users import AdminUserCreate, AdminUserPatch

router = APIRouter()


def display_user(user: User):
    return {
        "id": user.id,
        "name": user.name,
        "room_number": user.room_number,
        "is_active": user.is_active,
    }


@router.post("/users")
async def admin_user_register(user: AdminUserCreate, db: Session = Depends(get_db)):
    generated_user = create_admin(user, db)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
        )

    return display_user(generated_user)


@router.patch("/users/{user_id}")
async def admin_user_patch(
    user_id: str, request: AdminUserPatch, db: Session = Depends(get_db)
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
    await db.commit()
    await db.refresh(user)
    return display_user(user)


@router.post("/groups")
async def create_group(request: GroupPostRequest, db: Session = Depends(get_db)):
    group = Group(name=request.name)
    db.add(group)
    await db.commit()
    await db.refresh(group)
    return group


@router.patch("/groups/{group_id}")
async def patch_gorup(
    group_id: str, request: GroupPostRequest, db: Session = Depends(get_db)
):
    group = db.get(Group, group_id)
    group.name = request.name
    await db.commit()
    await db.refresh(group)
    return group


@router.delete("/groups/{group_id}")
async def delete_group(group_id: str, db: Session = Depends(get_db)):
    group = db.get(Group, group_id)
    db.delete(group)
    db.commit()
    return group


@router.post("/groups/{group_id}/adduser")
async def create_superuser(
    group_id: str, request: AddSuperUserRequest, db: Session = Depends(get_db)
):
    response_users = []
    for user_id in request.users:
        group_user = db.get(GroupUser, user_id)
        if not group_user:
            group_user = GroupUser(user_id=user_id, group_id=group_id, role="super")
            db.add(group_user)
            await db.commit()
            await db.refresh(group_user)
            response_users.append(group_user)
            continue
        group_user.role = "super"
        await db.commit()
        await db.refresh(group_user)
        response_users.append(group_user)

    return {"users": [group_user_display(user) for user in response_users]}
