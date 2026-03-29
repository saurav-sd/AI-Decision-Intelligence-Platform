import google.generativeai as genai
import os
from app.core.config import settings

# Configure Gemini
# genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# model = genai.GenerativeModel("models/gemini-3-flash-preview")

model = genai.GenerativeModel(settings.MODEL_NAME)


# 🧠 1. Data Analyst Agent
def data_analyst_agent(data, question=None):
    prompt = f"""
    You are a data analyst.

    Data:
    {data}
    """

    if question:
        prompt += f"\nUser Question:\n{question}\n"

    prompt += """
    Analyze patterns, trends, and anomalies.
    """

    return model.generate_content(prompt).text


# 📈 2. Growth Agent
def growth_agent(data, question=None):
    prompt = f"""
    You are a growth expert.

    Data:
    {data}
    """

    if question:
        prompt += f"\nQuestion:\n{question}\n"

    prompt += """
    Suggest improvements and experiments.
    """

    return model.generate_content(prompt).text


# ⚠️ 3. Risk Agent
def risk_agent(data, question=None):
    prompt = f"""
    You are a risk analyst.

    Data:
    {data}
    """

    if question:
        prompt += f"\nQuestion:\n{question}\n"

    prompt += """
    Identify risks and issues.
    """

    return model.generate_content(prompt).text


# 🤖 4. Orchestrator (CORE)
def run_agents(data, question=None):
    return {
        "data_agent": data_analyst_agent(data, question),
        "growth_agent": growth_agent(data, question),
        "risk_agent": risk_agent(data, question),
    }


# 🧠 5. Final Synthesizer Agent (VERY IMPORTANT)
def summarize_agents_output(agent_outputs):
    prompt = f"""
    You are a senior product strategist.

    Combine the following agent insights into one final summary:

    {agent_outputs}

    Provide:
    - key takeaway
    - main problem
    - recommended action
    """

    response = model.generate_content(prompt)
    return response.text

def classify_intent(message: str) -> str:
    prompt = f"""
    Classify the user message into ONE category:

    - casual → greetings, small talk
    - analytics → questions about data, users, events, funnels, retention

    Message:
    {message}

    Return ONLY one word: casual OR analytics
    """

    response = model.generate_content(prompt)

    return response.text.strip().lower()


def normal_chat_reply(message: str) -> str:
    prompt = f"""
    You are a friendly AI analytics assistant.

    Respond casually and briefly.

    User:
    {message}
    """

    response = model.generate_content(prompt)
    return response.text