import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

class Settings:
    GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
    MODEL_NAME = "models/gemini-2.5-flash-lite"

settings = Settings()

if not settings.GOOGLE_API_KEY:
    raise ValueError("GOOGLE_API_KEY not found. Check your .env file!")

genai.configure(api_key=settings.GOOGLE_API_KEY)