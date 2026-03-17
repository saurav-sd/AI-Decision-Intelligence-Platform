from pydantic import BaseModel
from typing import Dict, Optional


class Event(BaseModel):
    user_id: str
    event_name: str
    properties: Optional[Dict[str, str]] = {}
