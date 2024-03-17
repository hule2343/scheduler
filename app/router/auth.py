from datetime import timedelta

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from pydantic import BaseModel
from sqlalchemy.orm import Session

import app.cruds.user as crud
from app.cruds.auth import (
    authenticate_user,
    create_access_token,
    get_current_active_user,
)
from app.cruds.user import user_response
from app.database import get_db
from app.models.models import User
from app.schemas.users import AdminUserCreate, AdminUserDisplay

ACCESS_TOKEN_EXPIRE_MINUTES = 30


router = APIRouter()


class LoginForm(BaseModel):
    username: str
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str


def display_user(user: User):
    return {
        "id": user.id,
        "name": user.name,
        "room_number": user.room_number,
        "is_active": user.is_active,
    }


@router.post("/register", response_model=AdminUserDisplay)
async def user_register(user: AdminUserCreate, db: Session = Depends(get_db)):
    generated_user = crud.create_admin(user, db)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
        )

    return display_user(generated_user)


@router.post("/login", response_model=Token)
async def login_for_access_token(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db),
):
    user = authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.name}, expires_delta=access_token_expires
    )
    return {
        "access_token": access_token,
        "id": user.id,
        "name": user.name,
        "token_type": "bearer",
    }


@router.get("/me")
async def get_current_user(user: User = Depends(get_current_active_user)):
    return user_response(user)
