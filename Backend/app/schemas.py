from pydantic import BaseModel
from typing import Any, Dict, Optional


class Event(BaseModel):
    user_id: str
    event_name: str
    properties: Optional[Dict[str, Any]] = {}


class ChatRequest(BaseModel):
    question: str
