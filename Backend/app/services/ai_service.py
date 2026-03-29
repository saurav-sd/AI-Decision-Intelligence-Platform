import google.generativeai as genai
from app.core.config import settings

model = genai.GenerativeModel(settings.MODEL_NAME)

def generate_insight(data):
    prompt = f"""
    You are a product analytics expert.

    Analyze this data:

    {data}

    Provide:
    - Key insights
    - Trends
    - Possible issues
    - Actionable suggestions
    """

    response = model.generate_content(prompt)

    return response.text
