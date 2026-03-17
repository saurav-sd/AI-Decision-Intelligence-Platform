from fastapi import FastAPI, Depends
from app.schemas import Event
from sqlalchemy.orm import Session
from .database import get_db, engine
import app.models as models

models.Base.metadata.create_all(bind=engine) # creates the database tables based on the defined models

app = FastAPI()

@app.get("/user/{name}")
async def get_user(name: str):
    return {"message": f"Hello, {name}!"}

@app.post("/events")
async def create_event(event: Event, db: Session = Depends(get_db)):
    new_event = models.Event(
        user_id=event.user_id,
        event_name=event.event_name,
    )
    db.add(new_event)
    db.commit()
    db.refresh(new_event)

    for key, value in event.properties.items():
        event_property = models.EventProperty(
            event_id=new_event.id,
            key=key,
            value=value
        )
        db.add(event_property)
    db.commit()

    return new_event


@app.get("/events")
async def get_events(db: Session = Depends(get_db)):
    events = db.query(models.Event).all()
    return {"events": events}