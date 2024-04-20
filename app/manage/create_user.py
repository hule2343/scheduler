from app.cruds.auth import get_password_hash
from app.database import SessionLocal
from app.models.models import User
from app.schemas.users import AdminUserCreate


def create_admin(user: AdminUserCreate):
    db = SessionLocal()
    new_user = User(
        name=user.name,
        room_number=user.room_number,
        password=get_password_hash(user.password),
        is_admin=True,
        is_active=True,
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user
