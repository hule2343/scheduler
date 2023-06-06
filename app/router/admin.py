from fastapi import APIRouter
from sqlalchemy.orm import Session
from fastapi import Depends
from app.database import get_db
from app.cruds import bid

router = APIRouter()


@router.post("/closebid")
async def close_finished_bid(db: Session = Depends(get_db)):
    response = bid.close_all_bid(db)
    return response
