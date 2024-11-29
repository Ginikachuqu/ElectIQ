import React, { useState } from 'react';
import { Candidate, Category } from '../types';

type Props = {
  category: Category;
  closeModal: () => void;
};

const VoteModal = ({ closeModal, category }: Props) => {
  const [hasVoted, setHasVoted] = useState(false);
  const [candidates, setCandidates] = useState(category.candidates);
  const [votedCandidateId, setVotedCandidateId] = useState<string | null>(null);

  const handleVote = (candidateId: string) => {
    if (!hasVoted) {
      setCandidates(prevCandidates =>
        prevCandidates.map(candidate =>
          candidate.id === candidateId
            ? { ...candidate, votes: (candidate.votes || 0) + 1 }
            : candidate
        )
      );
      setHasVoted(true);
      setVotedCandidateId(candidateId);
    }
  };

  return (
    <section className="w-[550px] h-fit bg-white rounded-md p-4">
      {/* Top */}
      <div className="flex w-full justify-between pb-2 border-b mb-4">
        <h3 className="font-bold">
          {category.name}
        </h3>
        <button 
          onClick={closeModal} 
          className="font-bold hover:scale-95 transition duration-200"
          aria-label="Close modal"
        >
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12z"/></svg>
          </span>
        </button>
      </div>

      {/* Candidates */}
      <div className="grid grid-cols-2 w-full gap-4 mb-2">
        {candidates.length !== 0 ? (
          candidates.map((candidate) => (
            <div key={candidate.id} className="flex gap-4">
              <div className="h-14 w-14 rounded-full bg-gray-200 overflow-hidden">
                <img 
                  src="/api/placeholder/56/56" 
                  alt={`${candidate.name}'s avatar`}
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <h3 className="mb-2 font-bold">{candidate.name}</h3>
                <div className="flex flex-col gap-2">
                  <button
                    className={`w-fit flex items-center gap-1 text-sm py-1 px-5 rounded-full transition duration-300 ${
                      hasVoted
                        ? 'bg-gray-300 cursor-not-allowed'
                        : 'bg-green-500/55 hover:scale-95'
                    }`}
                    onClick={() => handleVote(candidate.id)}
                    disabled={hasVoted}
                  >
                    {votedCandidateId === candidate.id && hasVoted ? (
                        <>
                            voted
                            <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="w-4 h-4 inline ml-1"
                            >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 13l4 4L19 7"
                            />
                            </svg>
                        </>
                        ) : (
                        'vote'
                    )}
                  </button>
                  <span className="text-sm text-gray-600">
                    {candidate.votes || 0} votes
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-2 text-center text-gray-500">
            No available candidates
          </p>
        )}
      </div>

      {/* Footer */}
      <div className="mt-4 flex flex-col gap-2">
        <span className="font-bold text-xs italic">
          NB: You can only vote once.
        </span>
        {hasVoted && (
          <span className="text-xs text-green-600">
            Thank you for voting! Your vote has been recorded.
          </span>
        )}
      </div>
    </section>
  );
};

export default VoteModal;