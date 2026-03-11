"use client";

import { useState } from "react";

interface MatchModalProps {
  match: any;
  onClose: () => void;
}

export default function MatchModal({ match, onClose }: MatchModalProps) {
  const [rating, setRating] = useState(0);

  const handleRatingSubmit = async () => {
    try {
      // In a real app, this would call the submitRating API
      console.log('Submitted rating:', rating);
      onClose();
    } catch (error) {
      console.error('Failed to submit rating:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-lg max-w-md w-full">
        <h3 className="text-2xl font-bold mb-4">Rate Your Session</h3>
        <div className="flex space-x-2 mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => setRating(star)}
              className={`text-2xl ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
            >
              ★
            </button>
          ))}
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          {match.username} - {match.canTeach.join(', ')}
        </p>
        <button
          className="w-full py-2 bg-primary text-white rounded hover:bg-teal-600 transition-colors"
          onClick={handleRatingSubmit}
        >
          Submit Rating
        </button>
        <button
          className="mt-2 w-full py-2 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}