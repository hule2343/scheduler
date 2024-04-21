from app.cruds.auth import get_password_hash
from app.database import SessionLocal
from app.models.models import User


def create_admin(name: str, password: str, room_number: str):
    db = SessionLocal()
    new_user = User(
        name=name,
        room_number=room_number,
        password=get_password_hash(password),
        is_admin=True,
        is_active=True,
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user
