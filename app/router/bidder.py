from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
import app.cruds.bidder as crud

router = APIRouter()


@router.get("/")
async def bidder_get(
    bid_id: str | None = None,
    user_id: str | None = None,
    is_canceled: bool | None = None,
    db: Session = Depends(get_db),
):
    if is_canceled:
        bidder = crud.bidder_cancel(db)
        return bidder
    bidder = crud.bidder_get(bid_id, user_id, db)
    return bidder
