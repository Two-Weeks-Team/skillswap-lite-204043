"use client";

import { useEffect, useState } from "react";
import Onboarding from '@/components/Onboarding';
import MatchFeed from '@/components/MatchFeed';
import CollectionPanel from '@/components/CollectionPanel';
import { fetchMatches } from '@/lib/api';

export default function Home() {
  const [matches, setMatches] = useState<any[]>([]);
  const [onboardingComplete, setOnboardingComplete] = useState(false);

  useEffect(() => {
    if (onboardingComplete) {
      fetchMatches().then((data) => setMatches(data));
    }
  }, [onboardingComplete]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {!onboardingComplete ? (
        <Onboarding onComplete={() => setOnboardingComplete(true)} />
      ) : (
        <div className="flex flex-col md:flex-row gap-6 p-4 md:p-6">
          <div className="w-full md:w-3/4">
            <h1 className="text-3xl font-semibold mb-4 text-primary">Skill Swap Feed</h1>
            {matches.length > 0 ? <MatchFeed matches={matches} /> : <p className="text-muted">No matches found yet.</p>}
          </div>
          <div className="w-full md:w-1/4">
            <CollectionPanel />
          </div>
        </div>
      )}
    </div>
  );
}