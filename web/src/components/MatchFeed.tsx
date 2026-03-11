"use client";

import { useState } from "react";
import { fetchMatches } from '@/lib/api';

const MatchFeed = ({ matches }: { matches: any[] }) => {
  const [selectedMatch, setSelectedMatch] = useState<any>(null);

  const handleBookSwap = async (matchId: string) => {
    try {
      const session = await fetchMatches();
      console.log('Booking session for match ID:', matchId);
      console.log('Session data:', session);
    } catch (error) {
      console.error('Failed to book session:', error);
    }
  };

  return (
    <div className="space-y-4">
      {matches.map((match, index) => (
        <div
          key={index}
          className="card p-4 flex flex-col md:flex-row items-center justify-between gap-4 hover:bg-muted transition-colors duration-200"
        >
          <div className="flex-1">
            <h3 className="text-lg font-semibold">{match.name}</h3>
            <p className="text-sm text-muted">
              Can Teach: {match.canTeach.join(', ')}
            </p>
            <p className="text-sm text-muted">
              Wants to Learn: {match.wantsToLearn.join(', ')}
            </p>
          </div>
          <button
            onClick={() => handleBookSwap(match.id)}
            className="px-4 py-2 bg-primary text-white rounded hover:bg-accent transition-colors duration-200"
          >
            Start 15-min Swap
          </button>
        </div>
      ))}
    </div>
  );
};

export default MatchFeed;