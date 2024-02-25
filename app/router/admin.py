from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.models import Group, GroupUser
from app.schemas.admin import AddSuperUserRequest, GroupPostRequest

router = APIRouter()


@router.post("/group")
async def create_group(request: GroupPostRequest, db: Session = Depends(get_db)):
    group = Group(name=request.name)
    db.add(group)
    await db.commit()
    await db.refresh(group)
    return group


@router.post("/user")
async def create_superuser(request: AddSuperUserRequest, db: Session = Depends(get_db)):
    group_user = db.get(GroupUser, request.user_id)
    if not group_user:
        group_user = GroupUser(
            user_id=request.user_id, group_id=request.group_id, role="super"
        )
        db.add(group_user)
        await db.commit()
        await db.refresh(group_user)
        return group_user

    group_user.role = "super"
    await db.commit()
    await db.refresh(group_user)
    return group_user
