import React from 'react'
import { Link } from 'react-router-dom'

type Props = {}

const Home = (props: Props) => {
  return (
    <section className='px-[4rem]'>
        <div className='h-screen w-full flex items-center justify-center'>
            <div className='p-3 rounded-xl w-[350px] h-fit bg-white shadow-md'>
                {/* Header */}
                <div className='text-center'>
                    <h2 className='text-xl font-bold'>Active Election &mdash; 2024</h2>
                </div>

                <div className='flex justify-between items-center mt-2'>
                    <div className='flex gap-2 items-center'>
                        <div className='h-12 w-12 rounded-full bg-gray-400'>
                            <img src="" alt="" />
                        </div>
                        <div className='h-12 w-12 rounded-full bg-gray-400 -ml-5 border border-white'>
                            <img src="" alt="" />
                        </div>
                        <div className='h-12 w-12 rounded-full bg-gray-400 -ml-6 border border-white'>
                            <img src="" alt="" />
                        </div>
                    </div>
                    <div>
                        <Link to='/booth' className='flex gap-2 items-center text-green-700 hover:text-green-600 transition duration-300 text-sm'>
                            <span>Click here to vote</span>
                            <span></span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Home