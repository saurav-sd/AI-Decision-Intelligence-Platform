from fastapi import Depends, APIRouter
from sqlalchemy.orm import Session
from app import models, schemas
from app.database import get_db
from pydantic import BaseModel

from app.services.ai_agents import run_agents, summarize_agents_output, classify_intent, normal_chat_reply
from app.services.ai_service import generate_insight


router = APIRouter()


@router.get("/ai/insights")
def get_ai_insights(db: Session = Depends(get_db)):
    events = db.query(models.Event).all() 

    if not events:
        return {"insight": "No data available yet to generate insights."}
    
    # Create a clean list of dictionaries without SQLAlchemy internal metadata
    clean_data = []
    for event in events:
        d = {column.name: getattr(event, column.name) for column in event.__table__.columns}
        clean_data.append(d)
    
    # Convert the clean list to a string
    data_for_ai = str(clean_data)
    
    insight = generate_insight(data_for_ai)
    return {"insight": insight.split("\n")} 



@router.get("/ai/agents")
def run_multi_agents(db: Session = Depends(get_db)):

    events = db.query(models.Event).all()

    # Build data summary
    event_counts = {}
    for e in events:
        event_counts[e.event_name] = event_counts.get(e.event_name, 0) + 1

    data = {
        "total_events": len(events),
        "event_counts": event_counts
    }

    # Run agents
    agents_output = run_agents(data)

    # Final combined insight
    final_summary = summarize_agents_output(agents_output)

    return {
        "agents": agents_output,
        "final": final_summary
    }



@router.post("/ai/chat")
def chat_with_agents(req: schemas.ChatRequest, db: Session = Depends(get_db)):

    user_message = req.question

    # 🧠 STEP 1: CLASSIFY INTENT
    intent = classify_intent(user_message)

    # 🔥 CASUAL CHAT FLOW
    if intent == "casual":
        reply = normal_chat_reply(user_message)

        return {
            "type": "casual",
            "agents": None,
            "final": reply
        }

    # 🔥 ANALYTICS FLOW (your existing logic)
    events = db.query(models.Event).all()

    event_counts = {}
    for e in events:
        event_counts[e.event_name] = event_counts.get(e.event_name, 0) + 1

    data = {
        "total_events": len(events),
        "event_counts": event_counts
    }

    agents_output = run_agents(data, user_message)
    final = summarize_agents_output(agents_output)

    return {
        "type": "analytics",
        "agents": agents_output,
        "final": final
    }