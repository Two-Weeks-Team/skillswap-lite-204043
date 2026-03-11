export const fetchMatches = async () => {
  const res = await fetch('http://localhost:8080/api/matches');
  if (!res.ok) {
    throw new Error(`Failed to fetch matches: ${res.status}`);
  }
  return res.json();
};

export const bookSwap = async (matchId: string) => {
  const res = await fetch('http://localhost:8080/api/sessions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ match_id: matchId }),
  });
  if (!res.ok) {
    throw new Error(`Failed to book swap: ${res.status}`);
  }
  return res.json();
};

export const submitRating = async (sessionId: string, rating: number) => {
  const res = await fetch('http://localhost:8080/api/ratings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ session_id: sessionId, rating }),
  });
  if (!res.ok) {
    throw new Error(`Failed to submit rating: ${res.status}`);
  }
  return res.json();
};
