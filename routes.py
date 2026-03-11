from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel, Field
from models import SessionLocal, User, Match, SessionRecord, Rating, Skill
from ai_service import rank_matches
from typing import List

router = APIRouter()

# Pydantic schemas
class MatchOut(BaseModel):
    match_id: int
    username: str
    skills: List[str]
    rating: float = Field(0.0)
    credits: int = Field(0)

class MatchesResponse(BaseModel):
    matches: List[MatchOut]

class SessionCreateRequest(BaseModel):
    match_id: int

class SessionCreateResponse(BaseModel):
    session_id: str
    signal_info: dict

class RatingRequest(BaseModel):
    session_id: str
    rating: int

class RatingResponse(BaseModel):
    credits_added: int

# Dependency to get DB session

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/matches", response_model=MatchesResponse, summary="Reciprocal match list")
async def get_matches(db=Depends(get_db)):
    # Simple list of all users as matches for demo; replace with actual AI logic
    users = db.query(User).filter(User.id != 1).all()  # assume current user id 1 for demo
    results = []
    for u in users:
        skills = [s.name for s in db.query(Skill).join(User.skills).filter(User.id == u.id).all()]
        # compute average rating
        rating_vals = [r.rating for r in u.ratings]
        avg_rating = sum(rating_vals) / len(rating_vals) if rating_vals else 0
        results.append(MatchOut(
            match_id=u.id,
            username=u.username,
            skills=skills,
            rating=avg_rating,
            credits=u.credits,
        ))
    # optional AI re‑ranking
    ranked = await rank_matches([m.dict() for m in results])
    # for demo, ignore ranking and just return results
    return MatchesResponse(matches=results)

@router.post("/sessions", response_model=SessionCreateResponse, summary="Create a 15‑minute session")
async def create_session(req: SessionCreateRequest, db=Depends(get_db)):
    match = db.query(Match).filter(Match.id == req.match_id).first()
    if not match:
        raise HTTPException(status_code=404, detail="Match not found")
    sess = SessionRecord(match_id=match.id)
    db.add(sess)
    db.commit()
    db.refresh(sess)
    # mock signal info
    signal_info = {"offer": "mock-offer-string", "iceServers": []}
    return SessionCreateResponse(session_id=str(sess.id), signal_info=signal_info)

@router.post("/ratings", response_model=RatingResponse, summary="Submit session rating")
async def submit_rating(req: RatingRequest, db=Depends(get_db)):
    sess = db.query(SessionRecord).filter(SessionRecord.id == int(req.session_id)).first()
    if not sess:
        raise HTTPException(status_code=404, detail="Session not found")
    # record rating; assume user id 1 for demo
    rating_obj = Rating(session_id=sess.id, user_id=1, rating=req.rating)
    db.add(rating_obj)
    # update credits
    user = db.query(User).filter(User.id == 1).first()
    if user:
        user.credits += req.rating * 2
    db.commit()
    return RatingResponse(credits_added=req.rating * 2)