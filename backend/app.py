[Earlier content for /workspace/backend/app.py (2910 chars, already written to disk). The module surface below may not show every signature you need — re-read with read_file before editing this file again, OR before importing/calling anything from it in another file. Do not recreate it from scratch and do not guess a function's parameters from memory.
Module surface:
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from alembic import command
from alembic.config import Config
from contextlib import asynccontextmanager
from typing import AsyncGenerator
import os
import json

# Initialize database
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./digital_product_factory.db")
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Create tables
Base.metadata.create_all(bind=engine)

# Initialize Alembic
ALEMBIC_CONFIG = Config("alembic.ini")

@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncGenerator[None, None]:
    # Startup
    try:
        command.upgrade(ALEMBIC_CONFIG, "head")
    except Exception:
        pass
    yield
    # Shutdown
    pass

app = FastAPI(title="Digital Product Factory AI", lifespan=lifespan)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Security
security = HTTPBearer()

# Health check
@app.get("/")
async def root():
    return {"message": "Digital Product Factory AI API", "status": "running"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "timestamp": "2024-01-01T00:00:00Z"}

print("Digital Product Factory AI API initialized successfully!")