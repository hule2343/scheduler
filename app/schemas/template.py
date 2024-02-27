from uuid import UUID

from pydantic import BaseModel, Field




class TemplateDate(BaseModel):
    year: int = Field(ge=2022)
    month: int = Field(ge=1, le=12)
    day: int = Field(ge=1, le=31)

    class Config:
        orm_mode = True


class TemplateTime(BaseModel):
    hour: int = Field(ge=0, le=23)
    minute: int = Field(ge=0, le=59)

    class Config:
        orm_mode = True


class TemplateSlot(BaseModel):
    id: UUID
    name: str
    date_from_start: int
    start_time: TemplateTime
    end_time: TemplateTime

    class Config:
        orm_mode = True


class TemplateDisplay(BaseModel):
    id: UUID
    name: str
    group_id: UUID
    slots: list[TemplateSlot]


class TemplateList(BaseModel):
    templates: list[TemplateDisplay]

    class Config:
        orm_mode = True


class TemplateTaskBase(BaseModel):
    id: UUID
    date_from_start: int
    start_time: TemplateTime
    end_time: TemplateTime

    def __hash__(self):
        return hash(
            (
                self.id,
                self.date_from_start,
                self.start_time.hour,
                self.start_time.minute,
            )
        )

    class Config:
        orm_mode = True


class TemplateCreateBase(BaseModel):
    name:str = Field(max_length=20)

class TemplateCreate(TemplateCreateBase):
    tasks: set[TemplateTaskBase] = set()

    class Config:
        orm_mode = True

class SlotByTemplate(BaseModel):
    start_day: TemplateDate

    class Config:
        orm_mode = True
