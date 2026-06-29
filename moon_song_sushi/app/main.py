
from fastapi import FastAPI, Request, Form
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
import sqlite3

app = FastAPI()
app.mount("/static", StaticFiles(directory="app/static"), name="static")
templates = Jinja2Templates(directory="app/templates")

db="moon_song.db"

def init():
    con=sqlite3.connect(db)
    cur=con.cursor()
    cur.execute('create table if not exists users(id integer primary key,name text,surname text,patronymic text,email text)')
    con.commit()
    con.close()

init()

@app.get("/", response_class=HTMLResponse)
def index(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

@app.get("/register", response_class=HTMLResponse)
def reg(request: Request):
    return templates.TemplateResponse("register.html", {"request": request})

@app.post("/register")
def register(name:str=Form(...),surname:str=Form(...),patronymic:str=Form(...),email:str=Form(...)):
    con=sqlite3.connect(db)
    con.execute("insert into users(name,surname,patronymic,email) values(?,?,?,?)",(name,surname,patronymic,email))
    con.commit()
    con.close()
    return RedirectResponse("/",302)
