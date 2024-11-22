import React from 'react'
import Card from '../../components/cards/Card'

import dummies from '../../lib/dummy'
import { useModal } from '../../hooks/useModal'
import PollResults from '../../modals/LivePollModal'

type Props = {}

const Booth = (props: Props) => {
  const { openModal, closeModal } = useModal()

  return (
    <section className='mt-[6.5rem] px-[4rem]'>
        <div className='w-full h-fit'>
            {/* Top */}
            <div className='mb-4'>
                <h2 className='text-center text-2xl font-bold'>Pick a category to vote</h2>
            </div>

            {/* Candidate array */}
            <section className='w-full grid grid-cols-3 gap-5'>
                {
                    dummies.categories.length !== 0 ? dummies.categories.map(category => (
                        <Card key={category.id} category={category} openModal={openModal} closeModal={closeModal}/>
                    )) : 'No Categories'
                }
            </section>
        </div>

        <button onClick={() => openModal(<PollResults categories={ dummies.categories } closeModal={() => closeModal()}/>)} className='fixed bottom-[3.5rem] right-[4rem] py-2 px-3 border-2 border-gray-500 border-dashed rounded-full bg-green-600/65 flex items-center gap-2 hover:scale-[.95] transition duration-250'>
            <span className='inline-block'>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M4 9h4v11H4zm12 4h4v7h-4zm-6-9h4v16h-4z"/></svg>
            </span>
            <span className='inline-block'>
                Check live poll results
            </span>
        </button>
    </section>
  )
}

export default Booth