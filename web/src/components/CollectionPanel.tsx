"use client";

import { useEffect, useState } from "react";
import { fetchMatches } from '@/lib/api';

const CollectionPanel = () => {
  const [savedMatches, setSavedMatches] = useState<any[]>([]);

  useEffect(() => {
    // Simulate fetching saved matches
    setSavedMatches([
      { id: '1', name: 'Alex', canTeach: ['UX Writing'], wantsToLearn: ['Data Viz'] },
      { id: '2', name: 'Jordan', canTeach: ['Prototyping'], wantsToLearn: ['UX Writing'] },
    ]);
  }, []);

  return (
    <div className="card p-4">
      <h2 className="text-lg font-semibold mb-3">Saved Matches</h2>
      {savedMatches.length > 0 ? (
        <ul className="space-y-2">
          {savedMatches.map((match, index) => (
            <li key={index} className="flex justify-between items-center">
              <div>
                <p className="font-medium">{match.name}</p>
                <p className="text-sm text-muted">
                  Can Teach: {match.canTeach.join(', ')}
                </p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-muted">No saved matches yet.</p>
      )}
    </div>
  );
};

export default CollectionPanel;