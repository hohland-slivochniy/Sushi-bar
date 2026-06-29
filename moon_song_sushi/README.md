
# Moon Song — суши/сашими магазин

Проект интернет‑магазина с 2 страницами:
1. Главная (меню, карточки, корзина, оформление заказа)
2. Регистрация / вход

Стек:
- Python
- FastAPI
- SQLite
- HTML
- CSS
- JavaScript

## Запуск

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Открыть:
http://127.0.0.1:8000

База создаётся автоматически: `moon_song.db`
