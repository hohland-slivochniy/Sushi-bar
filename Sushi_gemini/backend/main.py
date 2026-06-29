from fastapi import FastAPI, Depends, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse, FileResponse
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import List, Optional
import os

from .database import engine, get_db
from . import models

# Автоматическое создание таблиц в файле базы данных SQLite moonsong.db
models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Moon Song API 🌸",
    description="Бэкенд на Python FastAPI с реляционной базой SQLite (.db) для доставки японской кухни",
    version="1.0.0"
)

class UserCreate(BaseModel):
    first_name: str
    last_name: str
    patronymic: Optional[str] = ""
    email: str

class UserOut(BaseModel):
    id: int
    first_name: str
    last_name: str
    patronymic: Optional[str]
    email: str

    class Config:
        from_attributes = True

class OrderCreate(BaseModel):
    user_id: int
    total_price: float
    street: str
    house: str
    apartment: Optional[str] = ""

@app.get("/", response_class=HTMLResponse)
async def serve_home():
    return """
    <html>
        <head><title>Moon Song API</title></head>
        <body style="font-family: sans-serif; padding: 40px; background: #ffe5ec; color: #804058;">
            <h1>🌸 Moon Song (Мун Сонг) FastAPI Server</h1>
            <p>Сервер успешно работает! Для тестирования API перейдите в <a href='/docs' style='color: #d46a84; font-weight: bold;'>Swagger UI (/docs)</a>.</p>
        </body>
    </html>
    """

@app.post("/api/register", response_model=UserOut)
def register_user(user: UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if db_user:
        return db_user
    new_user = models.User(
        first_name=user.first_name,
        last_name=user.last_name,
        patronymic=user.patronymic,
        email=user.email
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

@app.get("/api/users", response_model=List[UserOut])
def get_all_users(db: Session = Depends(get_db)):
    return db.query(models.User).all()

@app.post("/api/orders")
def create_order(order: OrderCreate, db: Session = Depends(get_db)):
    new_order = models.Order(
        user_id=order.user_id,
        total_price=order.total_price,
        address_street=order.street,
        address_house=order.house,
        address_apartment=order.apartment
    )
    db.add(new_order)
    db.commit()
    db.refresh(new_order)
    return {"status": "success", "order_id": new_order.id, "message": "Заказ успешно сохранен в файле moonsong.db"}
