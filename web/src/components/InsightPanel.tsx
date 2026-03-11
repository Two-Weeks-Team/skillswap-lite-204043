"use client";

import { useState } from "react";

export default function InsightPanel() {
  const [activeTab, setActiveTab] = useState('history');

  return (
    <div className="bg-white p-4 rounded-lg shadow-card">
      <div className="flex border-b mb-4">
        <button
          className={`px-4 py-2 font-medium ${activeTab === 'history' ? 'border-b-2 border-primary text-primary' : ''}`}
          onClick={() => setActiveTab('history')}
        >
          Recent Activity
        </button>
        <button
          className={`px-4 py-2 font-medium ${activeTab === 'credits' ? 'border-b-2 border-primary text-primary' : ''}`}
          onClick={() => setActiveTab('credits')}
        >
          Credits
        </button>
      </div>

      {activeTab === 'history' && (
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">May 5, 2025</span>
            <span className="text-sm text-muted-foreground">+12 credits</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Apr 28, 2025</span>
            <span className="text-sm text-muted-foreground">+8 credits</span>
          </div>
        </div>
      )}

      {activeTab === 'credits' && (
        <div>
          <p className="text-sm text-muted-foreground">
            You earn 12 credits per completed swap. Credits can be used to prioritize your matches.
          </p>
          <button className="mt-4 w-full py-2 bg-accent text-white rounded hover:bg-coral-600 transition-colors">
            Upgrade to Premium
          </button>
        </div>
      )}
    </div>
  );
}