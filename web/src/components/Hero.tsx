"use client";

import { useState } from "react";

const Hero = () => {
  const [showDemo, setShowDemo] = useState(false);

  return (
    <div className="text-center py-12 px-4">
      <h1 className="text-4xl font-bold mb-4 text-primary">
        15-Minute Peer Skill Swaps, No Frills.
      </h1>
      <p className="text-lg mb-6 text-muted">
        Swap skills with peers in under 2 minutes. No subscriptions. No scheduling.
      </p>
      <button
        onClick={() => setShowDemo(true)}
        className="px-6 py-3 bg-primary text-white rounded hover:bg-accent transition-colors duration-200"
      >
        Start Swapping
      </button>
      {showDemo && (
        <div className="mt-6 p-4 bg-muted rounded">
          <p className="text-sm">
            Maya, a junior product designer, imports LinkedIn, selects 3 skills, and books a 15-minute swap in under 2 minutes.
          </p>
        </div>
      )}
    </div>
  );
};

export default Hero;