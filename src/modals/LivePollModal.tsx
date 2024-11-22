import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Candidate = {
  id: number;
  name: string;
  votes: number;
  imageUrl?: string;
};

type Category = {
  id: number;
  name: string;
  candidates: Candidate[];
  totalVotes: number;
};

type Props = {
  categories: Category[];
  closeModal: () => void
};

const PollResults = ({ categories, closeModal }: Props) => {
  const [selectedCategory, setSelectedCategory] = useState<number>(categories[0]?.id);

  const getProgressColor = (isLeading: boolean) => {
    return isLeading ? 'bg-green-500/40' : 'bg-red-500/40';
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Tabs - Modified to wrap */}
      <div className="p-2 bg-gray-50">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`
                px-4 py-2 rounded-lg border border-dashed border-gray-300 text-sm font-medium transition-all duration-200
                ${selectedCategory === category.id 
                  ? 'bg-green-500/40 shadow text-gray-600' 
                  : 'hover:bg-white/50 text-gray-600'}
              `}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="p-6">
        <AnimatePresence mode="wait">
          {categories.map((category) => {
            if (category.id !== selectedCategory) return null;

            const sortedCandidates = [...category.candidates].sort((a, b) => b.votes - a.votes);
            const maxVotes = Math.max(...sortedCandidates.map(c => c.votes));

            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex justify-between items-baseline mb-6">
                  <h2 className="text-2xl font-bold">{category.name}</h2>
                  <div className="text-sm text-gray-600">
                    Total Votes: {category.totalVotes}
                  </div>
                </div>

                <div className="space-y-4">
                  <AnimatePresence>
                    {sortedCandidates.map((candidate, index) => {
                      const percentage = ((candidate.votes / category.totalVotes) * 100).toFixed(1);
                      const isLeading = candidate.votes === maxVotes && candidate.votes > 0;

                      return (
                        <motion.div
                          key={candidate.id}
                          layout
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 40,
                            mass: 1
                          }}
                        >
                          <div className="relative">
                            <div className="relative z-10 flex items-center gap-4 bg-white p-4 rounded-lg border border-gray-200">
                              {/* Position Badge */}
                              <div className={`
                                w-8 h-8 flex items-center justify-center rounded-full
                                ${index === 0 ? 'bg-yellow-400' : 
                                  index === 1 ? 'bg-gray-300' : 
                                  index === 2 ? 'bg-amber-600' : 'bg-gray-200'}
                                text-white font-bold
                              `}>
                                {index + 1}
                              </div>

                              {/* Candidate Image */}
                              <div className="h-12 w-12 rounded-full overflow-hidden bg-gray-200">
                                <img
                                  src={candidate.imageUrl || "/api/placeholder/48/48"}
                                  alt={`${candidate.name}'s avatar`}
                                  className="w-full h-full object-cover"
                                />
                              </div>

                              {/* Candidate Info */}
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <h3 className="font-semibold">{candidate.name}</h3>
                                  {isLeading && (
                                    <span className="text-xs text-green-600 bg-green-100 px-2 py-0.5 rounded-full">
                                      Leading
                                    </span>
                                  )}
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-sm text-gray-600">
                                    {candidate.votes} votes
                                  </span>
                                  <span className="text-sm text-gray-400">
                                    ({percentage}%)
                                  </span>
                                </div>
                              </div>

                              {/* Vote Bar with Color */}
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${percentage}%` }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                                className={`absolute left-0 top-0 h-full rounded-lg -z-10 ${getProgressColor(isLeading)}`}
                              />
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
        <button onClick={closeModal} className='flex items-center gap-1 text-white mt-8 text-sm py-2 px-3 bg-error-500/75 rounded-md hover:scale-95 transition duration-300'>
          <span className='inline-block'>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12z"/></svg>
          </span>
          <span className='inline-block'>
            Close menu
          </span>
        </button>
      </div>
    </div>
  );
};

export default PollResults;