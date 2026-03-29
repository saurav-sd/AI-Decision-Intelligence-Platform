from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import engine
import app.models as models
from app.api.routes.events import router as events_router
from app.api.routes.ai import router as ai_router



models.Base.metadata.create_all(bind=engine) # creates the database tables based on the defined models

app = FastAPI()


@app.get("/user/{name}")
async def get_user(name: str):
    return {"message": f"Hello, {name}!"}

# 1. Define the "Origins" that are allowed to talk to your server
origins = [
    "http://localhost:5173",  # Your React/Vite dev server
    "http://127.0.0.1:5173",
    "http://localhost:3000"
]

# CORS middleware to allow requests from the Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins, # Your Next.js URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(events_router) # include the router from the events module to handle API endpoints related to events
app.include_router(ai_router) # include the router from the ai module to handle API endpoints related



