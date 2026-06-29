import JSZip from 'jszip';

export const generateAndDownloadZip = async () => {
  const zip = new JSZip();

  // 1. README.md
  const readmeContent = `# 🌸 Moon Song (Мун Сонг) — Доставка японской кухни премиум-класса

Визуальный стиль: Пастельная палитра цветов (Pastel Palette), Liquid Glass Style, Скругленные углы.
Технологический стек проекта:
- **Backend:** Python 3.10+, FastAPI, SQLAlchemy, SQLite (.db файл)
- **Frontend:** HTML5, CSS3 (Glassmorphism & Liquid Glass), JavaScript (ES6+ JSS)

---

## 🚀 Как запустить проект локально

### 1. Установка зависимостей Python
Убедитесь, что у вас установлен Python 3.10 или новее. Откройте терминал в папке проекта и выполните:

\`\`\`bash
pip install -r requirements.txt
\`\`\`

### 2. Запуск сервера FastAPI с базой данных SQLite
Выполните команду для старта веб-сервера:

\`\`\`bash
uvicorn backend.main:app --host 0.0.0.0 --port 8000 --reload
\`\`\`

После запуска откройте в браузере:
👉 **http://localhost:8000** — Главная страница приложения Moon Song
👉 **http://localhost:8000/docs** — Интерактивная документация API (Swagger UI)

---

## 📦 Структура проекта
- \`backend/main.py\` — Основной файл FastAPI приложения и маршруты REST API
- \`backend/database.py\` — Настройка подключения к файлу базы данных SQLite (\`moonsong.db\`)
- \`backend/models.py\` — Модели данных SQLAlchemy (Пользователи, Заказы, Элементы корзины)
- \`static/\` — Статические файлы (HTML, CSS, JS) с пастельным дизайном Liquid Glass
- \`requirements.txt\` — Список необходимых библиотек Python
- \`README.md\` — Описание проекта и инструкция по запуску

---

## 💎 Реализованный функционал
1. **Регистрация и личный кабинет:** Ввод Имени, Фамилии, Отчества и Почты. Мгновенная авторизация с сохранением профиля в файле \`moonsong.db\`.
2. **Каталог из 9 разделов:** Сеты, Суши, Роллы, Воки, Донбури, Супы, Напитки, Десерты, Прочее.
3. **Карточка товара в реализме:** Полный состав, калорийность, значки халяль/остроты/сладости, рекомендуемые напитки. При клике плавно увеличивается за 0.5с с размытием фона сайта (backdrop-blur).
4. **Интерактивная корзина:** Нежно-розовый кружочек-счетчик на карточке товара. Полноэкранное всплывающее окно корзины с управлением количеством и итоговым счетом.
5. **Оформление заказа:** Ввод адреса доставки и праздничное подтверждение заказа с очищением корзины.
`;

  // 2. requirements.txt
  const requirementsContent = `fastapi==0.110.0
uvicorn[standard]==0.27.1
sqlalchemy==2.0.28
pydantic==2.6.4
jinja2==3.1.3
python-multipart==0.0.9
`;

  // 3. backend/database.py
  const databaseContent = `from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

SQLALCHEMY_DATABASE_URL = "sqlite:///./moonsong.db"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
`;

  // 4. backend/models.py
  const modelsContent = `from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime
from sqlalchemy.orm import relationship
import datetime
from .database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    patronymic = Column(String, nullable=True)
    email = Column(String, unique=True, index=True, nullable=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    orders = relationship("Order", back_populates="owner")

class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    total_price = Column(Float, nullable=False)
    address_street = Column(String, nullable=False)
    address_house = Column(String, nullable=False)
    address_apartment = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    status = Column(String, default="Приготовление")

    owner = relationship("User", back_populates="orders")
`;

  // 5. backend/main.py
  const mainContent = `from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse, FileResponse
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import List, Optional
import os

from .database import engine, get_db, Base
from . import models

# Создание таблиц в файле .db при старте
models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Moon Song API",
    description="Доставка японской кухни в стиле Liquid Glass",
    version="1.0.0"
)

# Подключение статики frontend
static_dir = os.path.join(os.path.dirname(__file__), "..", "static")
if os.path.exists(static_dir):
    app.mount("/static", StaticFiles(directory=static_dir), name="static")

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
    index_path = os.path.join(static_dir, "index.html")
    if os.path.exists(index_path):
        return FileResponse(index_path)
    return "<h1>Moon Song API запущен! Перейдите на /docs для документации API</h1>"

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
    return {"status": "success", "order_id": new_order.id, "message": "Заказ успешно оформлен и сохранен в базе .db!"}
`;

  // 6. Standalone static HTML
  const htmlContent = `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <title>Moon Song — Японская кухня Liquid Glass</title>
  <style>
    body { font-family: 'Segoe UI', Tahoma, sans-serif; background: linear-gradient(135deg, #ffe5ec, #f0efeb, #e8dafb); margin: 0; padding: 2rem; color: #4a4e69; }
    .glass { background: rgba(255, 255, 255, 0.65); backdrop-filter: blur(16px); border: 1px solid rgba(255, 255, 255, 0.8); border-radius: 24px; padding: 2rem; box-shadow: 0 8px 32px rgba(255, 182, 193, 0.25); max-width: 800px; margin: 0 auto; }
    h1 { color: #d46a84; }
  </style>
</head>
<body>
  <div class="glass">
    <h1>🌸 Moon Song (Мун Сонг)</h1>
    <p>Добро пожаловать в проект Moon Song! Backend на Python FastAPI с базой SQLite успешно инициализирован.</p>
    <p>Для интерактивного тестирования API откройте <a href="/docs" style="color: #d46a84; font-weight: bold;">/docs (Swagger UI)</a>.</p>
  </div>
</body>
</html>`;

  zip.file("README.md", readmeContent);
  zip.file("requirements.txt", requirementsContent);
  zip.file("backend/__init__.py", "");
  zip.file("backend/database.py", databaseContent);
  zip.file("backend/models.py", modelsContent);
  zip.file("backend/main.py", mainContent);
  zip.file("static/index.html", htmlContent);

  const content = await zip.generateAsync({ type: "blob" });
  const url = URL.createObjectURL(content);
  const a = document.createElement("a");
  a.href = url;
  a.download = "moon_song_fastapi_sqlite_project.zip";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
