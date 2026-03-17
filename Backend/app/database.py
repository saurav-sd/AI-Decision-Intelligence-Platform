from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

DATABASE_URL = "postgresql://postgres:admin123@localhost/analytics_db"

# create_engine → connects to database
# SessionLocal → manages database transactions
# Base → base class for models

engine = create_engine(DATABASE_URL) # connects to the database
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine) # manages database transactions
Base = declarative_base() # base class for models, used to define database tables and their relationships


# Dependency to get DB session
def get_db():
    db = SessionLocal() # creates a new database session
    try:
        yield db # yields the session to be used in API endpoints
    finally:
        db.close() # ensures the session is closed after use