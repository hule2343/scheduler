from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.future import select
from sqlalchemy.orm import Session

from app.cruds.auth import check_privilege, get_current_active_user
from app.cruds.response import role_display
from app.database import get_db
from app.models.models import Role, User
from app.schemas.role import RoleCreate

router = APIRouter()


@router.get("/")
async def get_role(
    group_id: str,
    user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db),
):
    check_privilege(group_id, user.id, "normal", db)
    roles = db.execute(select(Role).filter(Role.group_id == group_id)).scalars().all()
    return {"roles": [role_display(role) for role in roles]}


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


@router.get("/{role_id}")
async def get_role_by_id(
    group_id: str,
    role_id: str,
    user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db),
):
    check_privilege(group_id, user.id, "normal", db)
    role = db.get(Role, role_id)
    return role_display(role)


@router.patch("/{role_id}")
async def update_role(
    group_id: str,
    role_id: str,
    request: RoleCreate,
    user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db),
):
    check_privilege(group_id, user.id, "edit_role", db)
    role = db.get(Role, role_id)
    if not role:
        raise HTTPException(status_code=404, detail="Role not found")
    role.name = request.name
    role.add_user = False
    role.remove_user = False
    role.edit_task = False
    role.edit_template = False
    role.edit_role = False
    role.change_user_role = False
    role.edit_slot = False
    role.add_slot_from_template = False
    role.edit_point = False

    for permission in request.permissions:
        setattr(role, permission, True)
    db.commit()
    db.refresh(role)
    return role_display(role)


@router.delete("/{role_id}")
async def delete_role(
    group_id: str,
    role_id: str,
    user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db),
):
    check_privilege(group_id, user.id, "edit_role", db)
    role = db.get(Role, role_id)
    db.delete(role)
    db.commit()
    return role_display(role)
