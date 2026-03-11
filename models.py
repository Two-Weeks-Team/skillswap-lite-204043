import os
from sqlalchemy import create_engine, Column, Integer, String, Float, ForeignKey, Table, DateTime
from sqlalchemy.orm import declarative_base, relationship, sessionmaker
from datetime import datetime

# Database URL handling
raw_url = os.getenv("DATABASE_URL", os.getenv("POSTGRES_URL", "sqlite:///./app.db"))
url = raw_url
if url.startswith("postgresql+asyncpg://"):
    url = url.replace("postgresql+asyncpg://", "postgresql+psycopg://", 1)
elif url.startswith("postgres://"):
    url = url.replace("postgres://", "postgresql+psycopg://", 1)

connect_args = {}
if "postgresql" in url and not url.startswith("postgresql+sqlite"):
    if "localhost" not in url and "127.0.0.1" not in url:
        connect_args = {"sslmode": "require"}

engine = create_engine(url, echo=False, connect_args=connect_args)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()
# Association table for skills
ss_user_skills = Table(
    "ss_user_skills",
    Base.metadata,
    Column("user_id", Integer, ForeignKey("ss_users.id"), primary_key=True),
    Column("skill_id", Integer, ForeignKey("ss_skills.id"), primary_key=True),
)

class User(Base):
    __tablename__ = "ss_users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    credits = Column(Integer, default=0)
    matches = relationship("Match", back_populates="user")
    ratings = relationship("Rating", back_populates="user")

class Skill(Base):
    __tablename__ = "ss_skills"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True)

class Match(Base):
    __tablename__ = "ss_matches"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("ss_users.id"))
    matched_user_id = Column(Integer, ForeignKey("ss_users.id"))
    created_at = Column(DateTime, default=datetime.utcnow)
    user = relationship("User", back_populates="matches", foreign_keys=[user_id])
    matched_user = relationship("User", foreign_keys=[matched_user_id])

class SessionRecord(Base):
    __tablename__ = "ss_sessions"
    id = Column(Integer, primary_key=True, index=True)
    match_id = Column(Integer, ForeignKey("ss_matches.id"))
    created_at = Column(DateTime, default=datetime.utcnow)
    match = relationship("Match")

class Rating(Base):
    __tablename__ = "ss_ratings"
    id = Column(Integer, primary_key=True, index=True)
    session_id = Column(Integer, ForeignKey("ss_sessions.id"))
    user_id = Column(Integer, ForeignKey("ss_users.id"))
    rating = Column(Integer)
    created_at = Column(DateTime, default=datetime.utcnow)
    user = relationship("User", back_populates="ratings")
    session = relationship("SessionRecord")

__all__ = [
    "SessionLocal",
    "engine",
    "Base",
    "User",
    "Skill",
    "Match",
    "SessionRecord",
    "Rating",
]