"use client";

import { useState } from "react";
import { fetchMatches } from '@/lib/api';

const Onboarding = ({ onComplete }: { onComplete: () => void }) => {
  const [username, setUsername] = useState('');
  const [skillsCanTeach, setSkillsCanTeach] = useState('');
  const [skillsWantToLearn, setSkillsWantToLearn] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call to save profile data
    await new Promise((r) => setTimeout(r, 1000));

    setLoading(false);
    onComplete();
  };

  return (
    <div className="max-w-md mx-auto p-6 rounded-lg shadow-lg bg-card">
      <h2 className="text-2xl font-bold mb-4">Welcome to SkillSwap Lite</h2>
      <p className="mb-6 text-muted">
        Enter your skills and start swapping in under 2 minutes.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border border-border rounded"
            placeholder="Maya"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Skills I Can Teach</label>
          <input
            type="text"
            value={skillsCanTeach}
            onChange={(e) => setSkillsCanTeach(e.target.value)}
            className="w-full p-2 border border-border rounded"
            placeholder="UX Writing, Data Viz"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Skills I Want to Learn</label>
          <input
            type="text"
            value={skillsWantToLearn}
            onChange={(e) => setSkillsWantToLearn(e.target.value)}
            className="w-full p-2 border border-border rounded"
            placeholder="Prototyping, Figma"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-primary text-white rounded hover:bg-accent transition-colors duration-200"
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Start Swapping'}
        </button>
      </form>
    </div>
  );
};

export default Onboarding;