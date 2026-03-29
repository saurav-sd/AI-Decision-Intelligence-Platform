from fastapi import Depends, APIRouter
from sqlalchemy.orm import Session
from app import models, schemas
from app.database import get_db
from typing import List


router = APIRouter()


@router.post("/events")
async def create_event(event: schemas.Event, db: Session = Depends(get_db)):
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


@router.get("/events")
async def get_events(db: Session = Depends(get_db)):
    events = db.query(models.Event).all()
    return {"events": events}


@router.post("/events/batch")
def track_events(events: List[schemas.Event], db: Session = Depends(get_db)):

    for event in events:
        new_event = models.Event(
            user_id=event.user_id,
            event_name=event.event_name
        )

        db.add(new_event)
        db.commit()
        db.refresh(new_event)

        for key, value in event.properties.items():
            prop = models.EventProperty(
                event_id=new_event.id,
                key=key,
                value=str(value)
            )
            db.add(prop)

        db.commit()

    return {"message": "Batch stored"}
