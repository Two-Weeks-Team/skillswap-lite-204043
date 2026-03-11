"use client";

import { useState } from "react";

export default function StatsStrip() {
  const [credits, setCredits] = useState(12);

  return (
    <div className="flex flex-wrap gap-3">
      <div className="bg-primary text-white p-3 rounded-lg">
        <p className="text-sm text-muted-foreground">Credits</p>
        <p className="text-lg font-bold">{credits}</p>
      </div>
      <div className="bg-accent text-white p-3 rounded-lg">
        <p className="text-sm text-muted-foreground">Matches</p>
        <p className="text-lg font-bold">24</p>
      </div>
      <div className="bg-muted p-3 rounded-lg">
        <p className="text-sm text-muted-foreground">Sessions</p>
        <p className="text-lg font-bold">7</p>
      </div>
    </div>
  );
}