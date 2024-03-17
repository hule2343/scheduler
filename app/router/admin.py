from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.models import Group, GroupUser
from app.schemas.admin import AddSuperUserRequest, GroupPostRequest
from app.router.user import group_user_display

router = APIRouter()


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
