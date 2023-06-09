from pydantic import BaseModel, Field
from uuid import UUID


class TemplateBase(BaseModel):
    id: UUID

    class Config:
        orm_mode = True


class Template(TemplateBase):
    name: str = Field(max_length=20)

    class Config:
        orm_mode = True


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


class TemplateCreate(BaseModel):
    name: str = Field(max_length=20)
    tasks: set[TemplateTaskBase] = set()

    class Config:
        orm_mode = True


class TemplateGenRequest(BaseModel):
    first_day: TemplateDate

    class Config:
        orm_mode = True


class TemplateBulkGenRequest(BaseModel):
    first_days: list[TemplateDate]

    class Config:
        orm_mode = True


class TemplateSlotDeleteRequest(BaseModel):
    slot_id: str
