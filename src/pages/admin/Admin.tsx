import React, { useState, FormEvent, ChangeEvent, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Predefined categories for candidates
const CANDIDATE_CATEGORIES = [
  'President', 
  'Vice-President', 
  'Secretary', 
  'Treasurer', 
  'Organizing Secretary', 
  'Welfare Director',
  'Public Relations Officer'
] as const;

// Type for Candidate Category
type CandidateCategory = typeof CANDIDATE_CATEGORIES[number];

// Interface for Candidate
interface Candidate {
  id: number;
  name: string;
  category: CandidateCategory;
  avatar: string;
}

const Admin: React.FC = () => {
  // State for current candidate details
  const [candidateDetails, setCandidateDetails] = useState<Omit<Candidate, 'id'>>({
    name: '',
    category: 'President',
    avatar: ''
  });

  // State for list of candidates
  const [candidatesList, setCandidatesList] = useState<Candidate[]>([]);

  // Ref for file input
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle input changes
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCandidateDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle file upload
  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCandidateDetails(prev => ({
          ...prev,
          avatar: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle drag and drop file upload
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setCandidateDetails(prev => ({
          ...prev,
          avatar: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Submit candidate details
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validate inputs
    if (!candidateDetails.name || !candidateDetails.category || !candidateDetails.avatar) {
      alert('Please fill in all fields and upload an avatar');
      return;
    }

    // Add to candidates list
    setCandidatesList(prev => [...prev, {
      ...candidateDetails,
      id: Date.now()
    }]);

    // Reset form
    setCandidateDetails({
      name: '',
      category: 'President',
      avatar: ''
    });

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Remove candidate from list
  const removeCandidateHandler = (id: number) => {
    setCandidatesList(prev => prev.filter(candidate => candidate.id !== id));
  };

  // Remove avatar
  const removeAvatar = () => {
    setCandidateDetails(prev => ({
      ...prev,
      avatar: ''
    }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Framer Motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200
      }
    }
  };

  const uploadContainerVariants = {
    rest: { 
      scale: 1,
      border: "2px dashed rgb(134 239 172)"
    },
    hover: { 
      scale: 1.02,
      border: "2px dashed rgb(22 163 74)",
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <div className="mt-[6.5rem] h-fit p-8">
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-xl mx-auto space-y-8"
      >
        {/* Candidate Upload Form */}
        <motion.div 
          variants={itemVariants}
          className="bg-white border rounded-2xl p-8 transform"
        >
          <h2 className="text-3xl font-extrabold mb-6 text-center text-black-900">Candidate Upload</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div variants={itemVariants}>
              <label className="block text-gray-700 font-semibold mb-2">Candidate Name</label>
              <input 
                type="text" 
                name="name"
                value={candidateDetails.name}
                onChange={handleInputChange}
                placeholder="Enter full name"
                className="w-full px-4 py-2 border border-green-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="block text-gray-700 font-semibold mb-2">Candidate Category</label>
              <select 
                name="category"
                value={candidateDetails.category}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-green-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
              >
                {CANDIDATE_CATEGORIES.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="block text-gray-700 font-semibold mb-2">Candidate Avatar</label>
              <motion.div 
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                variants={uploadContainerVariants}
                initial="rest"
                whileHover="hover"
                className="relative w-full h-32 border-2 border-dashed border-green-300 rounded-xl flex flex-col items-center justify-center text-center p-6 transition duration-300"
              >
                <input 
                  ref={fileInputRef}
                  id="avatar-upload"
                  type="file" 
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                
                <AnimatePresence>
                  {candidateDetails.avatar ? (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="relative"
                    >
                      <img 
                        src={candidateDetails.avatar} 
                        alt="Avatar Preview" 
                        className="w-20 h-20 object-cover rounded-full shadow-lg"
                      />
                      <motion.button 
                        type="button"
                        onClick={removeAvatar}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition"
                      >
                        X
                      </motion.button>
                    </motion.div>
                  ) : (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center text-gray-500"
                    >
                      <p className="text-lg font-semibold">
                        Drag & Drop or Click to Upload
                      </p>
                      <p className="text-sm text-gray-400 mt-2">
                        PNG, JPG, or JPEG (MAX. 800x800px)
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>

            <motion.button 
              variants={itemVariants}
              type="submit" 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-green-600 text-white py-2 rounded-xl hover:bg-green-700 transition duration-300 shadow-lg hover:shadow-xl"
            >
              Upload Candidate
            </motion.button>
          </form>
        </motion.div>

        {/* Candidates List */}
        <motion.div 
          variants={itemVariants}
          className="bg-white shadow-2xl rounded-2xl p-8"
        >
          <h2 className="text-3xl font-extrabold mb-6 text-center text-green-900">
            Nominated Candidates
          </h2>
          
          <AnimatePresence>
            {candidatesList.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center text-gray-400 py-12"
              >
                <p className="text-xl">No candidates nominated yet</p>
              </motion.div>
            ) : (
              <motion.div 
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {candidatesList.map((candidate) => (
                  <motion.div 
                    key={candidate.id}
                    variants={itemVariants}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-green-50 rounded-2xl p-3 border flex flex-col items-center transform transition"
                  >
                    <motion.img 
                      src={candidate.avatar} 
                      alt={candidate.name} 
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="w-20 h-20 object-cover rounded-full border-4 mb-4"
                    />
                    <h3 className="text-lg text-center font-bold text-green-900 mb-2">{candidate.name}</h3>
                    <p className="text-green-600 mb-4">{candidate.category}</p>
                    <motion.button 
                      onClick={() => removeCandidateHandler(candidate.id)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="bg-red-500 text-white px-6 py-2 rounded-xl hover:bg-red-600 transition duration-300"
                    >
                      Remove
                    </motion.button>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Admin;