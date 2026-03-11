import { httpx } from 'httpx';

export const fetchMatches = async () => {
  const res = await httpx.get('http://localhost:8080/api/matches');
  return res.json();
};

export const bookSwap = async (matchId: string) => {
  const res = await httpx.post('http://localhost:8080/api/sessions', {
    json: { match_id: matchId },
  });
  return res.json();
};

export const submitRating = async (sessionId: string, rating: number) => {
  const res = await httpx.post('http://localhost:8080/api/ratings', {
    json: { session_id: sessionId, rating: rating },
  });
  return res.json();
};