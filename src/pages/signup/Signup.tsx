import React from 'react'
import { Link } from 'react-router-dom'

type Props = {}

const Signup = (props: Props) => {
  return (
    <section className='w-full h-screen flex items-center justify-center px-[4rem] py-4'>
      <div className='w-[450px] h-fit p-6 bg-white rounded-xl shadow-md'>

        {/* Top */}
        <div className='mb-4 text-center'>
          <h2 className='text-3xl font-bold mb-1'> Create account </h2>
          <p className='text-gray-500 text-sm'>
            Already have an account? <Link to='/signin' className='text-green-700 underline transition hover:text-green-600 duration-300'>Sign in</Link>
          </p>
        </div>

        {/* Form */}
        <form>
          <div className='mb-4 flex gap-2 w-full'>
            <div className='w-1/2  rounded-lg bg-gray-200'>
              <input className='w-full h-full p-3 rounded-lg text-sm font-pregular bg-transparent focus:outline-green-300 focus:bg-white focus:shadow-md' type="text" name="firstName" id="firstName" placeholder='First name' />
            </div>
            <div className='w-1/2  rounded-lg bg-gray-200'>
              <input className='w-full h-full p-3 rounded-lg text-sm font-pregular bg-transparent focus:outline-green-300 focus:bg-white focus:shadow-md' type="text" name="lastName" id="lastName" placeholder='Last name' />
            </div>
          </div>
          <div className='mb-4 flex gap-2 w-full'>
            <div className='w-full  rounded-lg bg-gray-200'>
              <input className='w-full h-full p-3 rounded-lg text-sm font-pregular bg-transparent focus:outline-green-300 focus:bg-white focus:shadow-md' type="number" name="matricNo" id="matricNo" placeholder='Matriculation number' />
            </div>
          </div>
          <div className='w-full'>
            <div className='w-full rounded-lg bg-gray-200'>
              <input className='w-full h-full p-3 rounded-lg text-sm font-pregular bg-transparent focus:outline-green-300 focus:bg-white focus:shadow-md' type="password" placeholder='Password' />
            </div>
          </div>

          <div className='mt-4'>
            <button className='bg-green-600 w-full p-2 rounded-md text-white font-normal hover:scale-[.95] transition duration-250'>
                Sign up
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default Signup