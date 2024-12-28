from datetime import datetime
from pydantic import BaseModel, field_validator, field_serializer, model_serializer


class Basket(BaseModel):
    name: str
    expired_at: str | datetime
    user_id: int

    @field_validator("expired_at")
    def change_date_format(cls, expired_at: str):
        return datetime.fromisoformat(expired_at)

    @field_serializer("expired_at")
    def serializer_expired_at(self, expired_at: datetime):
        return expired_at.isoformat()


class Dishes(BaseModel):
    id: int
    name: str
    description: str
    price: int
    weight: float
    calories: float
    proteins: float
    fats: float
    carbs: float
    photo_large: str
    photo_original: str
    photo_webp: str
    category_id: int


class BasketDetail(Basket):
    name: str
    expired_at: str
    user_id: str
    items: list[Dishes]
