import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import toast from 'react-hot-toast'

type Props = {}

const Signin = (props: Props) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { signIn, isLoading } = useAuth()

  const navigate = useNavigate()

  const handleSignIn = async (e) => {
    e.preventDefault()

    if (formData.email === '' || formData.password === '') {
      toast.error('Enter a valid email or password')
      throw new Error('Enter a valid email or password')
    }

    try {
      const result = await signIn(formData.email, formData.password)
      console.log(result)

      if(result.data) {
        toast.success('Signin success')
        navigate('/')
      }

      if(result.error) {
        throw new Error(result.error)
      }
    } catch (error) {
      toast.error((error as Error).message)
      console.log((error as Error).message)
    }
  }

  return (
    <section className='w-full h-screen flex items-center justify-center px-[4rem] py-4'>
      <div className='w-[450px] h-fit p-6 bg-white rounded-2xl border'>

        {/* Top */}
        <div className='mb-4 text-center'>
          <h2 className='text-3xl font-bold mb-1'> Welcome back </h2>
          <p className='text-gray-500 text-sm'>
            Don't have an account? <Link to='/signup' className='text-green-700 underline transition hover:text-green-600 duration-300'>Sign up</Link>
          </p>
        </div>

        {/* Form */}
        <form>
          <div className='mb-4 flex gap-2 w-full'>
            <div className='w-full  rounded-xl bg-gray-200'>
              <input className='w-full h-full p-3 rounded-xl text-sm font-pregular bg-transparent focus:outline-green-300 focus:bg-white focus:shadow-md' type="email" name="email" id="email" placeholder='Email' value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} autoComplete='off'/>
            </div>
          </div>

          <div className='w-full'>
            <div className='w-full rounded-xl bg-gray-200'>
              <input className='w-full h-full p-3 rounded-xl text-sm font-pregular bg-transparent focus:outline-green-300 focus:bg-white focus:shadow-md' type="password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} placeholder='Password' />
            </div>
          </div>

          <div className='mt-4'>
            <button 
              disabled={isLoading}
              onClick={(e) => handleSignIn(e)}
              className='bg-green-600 flex justify-center w-full p-2 rounded-xl text-white font-normal hover:scale-[.95] transition duration-250 disabled:opacity-50'
            >
              {isLoading ? 
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" opacity=".25"/><path fill="currentColor" d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z"><animateTransform attributeName="transform" dur="0.75s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"/></path></svg>
              : 'Sign in'
              }
            </button>
          </div>

          <div className='mt-4 text-center'>
            <Link to='/' className='text-sm hover:underline transition duration-300'>Forgot password? Click here</Link>
          </div>
        </form>
      </div>
    </section>
  )
}

export default Signin
/* amara created the s8gnin page*/