from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.cruds.auth import check_privilege, get_current_active_user
from app.cruds.response import role_display
from app.database import get_db
from app.models.models import Role, User
from app.schemas.role import RoleCreate

router = APIRouter()


@router.post("/")
async def add_role(
    group_id: str,
    request: RoleCreate,
    user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db),
):
    check_privilege(group_id, user.id, "edit_role", db)
    role = Role(name=request.name, group_id=group_id)
    for permission in request.permissions:
        setattr(role, permission, True)
    db.add(role)
    db.commit()
    db.refresh(role)
    return role_display(role)