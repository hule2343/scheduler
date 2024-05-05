from fastapi import APIRouter, Depends
from sqlalchemy.future import select
from sqlalchemy.orm import Session

from app.cruds.auth import get_current_active_user
from app.database import get_db
from app.models.models import Group, GroupUser, User
from app.schemas.groups import GroupsDisplay

router = APIRouter()


@router.get("/", response_model=GroupsDisplay)
def group_list(
    db: Session = Depends(get_db),
    user: User = Depends(get_current_active_user),
):
    groups = db.scalars(select(Group)).all()
    response = []
    for group in groups:
        group_user = db.scalars(
            select(GroupUser).filter(
                GroupUser.group_id == group.id, GroupUser.user_id == user.id
            )
        ).first()
        if not group_user:
            response.append({"id": group.id, "name": group.name, "role": None})
        else:
            response.append(
                {"id": group.id, "name": group.name, "role": group_user.role}
            )

    return {"groups": response}
