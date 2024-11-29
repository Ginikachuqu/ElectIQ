import React from 'react'

import VoteModal from '../../modals/VoteModal';

import { Candidate, Category } from '../../types'

type Props = {
    category: Category;
    openModal: () => void;
    closeModal: () => void;
}

const Card = ({ category, openModal, closeModal }: Props) => {
  return (
    <div className='py-3 px-4 rounded-xl bg-white border'>
        {/* Header */}
        <div className='mb-4'>
            <h4 className='text-center text-lg font-semibold'>{ category.name }</h4>
        </div>

        <div className='flex items-center justify-center'>
            {
                category.candidates.length !== 0 ? category.candidates.map((candidate, index) => (
                    <div key={candidate.id} className={`h-12 w-12 rounded-full border border-white bg-gray-400`}>
                        <img src="" alt="" />
                    </div>
                )) : 'No available candidate'
            }
        </div>

        <div className='mt-4'>
            <button onClick={() => openModal(<VoteModal category={ category } closeModal={() => closeModal()}/>)} className='bg-green-500 w-full p-2 rounded-xl text-white font-normal hover:scale-[.95] transition duration-250'>
                Click to vote
            </button>
        </div>
    </div>
  )
}

export default Card