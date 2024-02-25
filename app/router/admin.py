from fastapi import APIRouter

router = APIRouter()

@router.post("/group")
async def create_group():
    