# purpose of models.py
# defines the structure of the database tables and their relationships using SQLAlchemy's ORM (Object-Relational Mapping) system

from sqlalchemy import Column, Integer, String, DateTime, Float, JSON, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
import uuid
from sqlalchemy.sql import func

from .database import Base

class Event(Base):
    __tablename__ = "events"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(String)
    event_name = Column(String)
    timestamp = Column(DateTime(timezone=True), default=func.now())

class EventProperty(Base):
    __tablename__ = "event_properties"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    event_id = Column(UUID(as_uuid=True), ForeignKey("events.id"))
    key = Column(String)
    value = Column(String)