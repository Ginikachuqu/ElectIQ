import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { supabase } from '../../lib/supabaseclient';

// Validation Schema
const signupSchema = z.object({
  firstName: z.string().min(2, { message: "First name must be at least 2 characters" }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  matricNo: z.string()
    .regex(/^\d+$/, { message: "Matriculation number must contain only numbers" })
    .min(6, { message: "Matriculation number must be at least 6 digits" })
    .max(11, { message: "Matriculation number cannot exceed 11 digits" }),
  password: z.string()
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[!@#$%^&*()]/, { message: "Password must contain at least one special character" })
});

// TypeScript type inference from Zod schema
type SignupFormData = z.infer<typeof signupSchema>;

const Signup = () => {
  const [ error, setError ] = useState('')
  // const [ isLoading, setIsLoading ] = useState(false)

  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting } 
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema)
  });

  const { signUp,isLoading } = useAuth()

  const navigate = useNavigate()

  const onSubmit = async (data: SignupFormData) => {
    try {
      const result = await signUp(
        data.email, 
        data.password, 
        data.matricNo, 
        data.firstName, 
        data.lastName
      );

      if (result.success) {
        alert('Signup successful!');
        // navigate('/booth'); // Redirect to dashboard or appropriate page
      } else {
        setError(result.error || 'Signup failed. Please try again.');
      }
    } catch (error) {
      console.error('Signup failed', error);
      setError('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <section className='w-full h-screen flex items-center justify-center px-[4rem] py-4'>
      <div className='w-[450px] h-fit p-6 bg-white rounded-2xl border'>
        {/* Top */}
        <div className='mb-4 text-center'>
          <h2 className='text-3xl font-bold mb-1'>Create account</h2>
          <p className='text-gray-500 text-sm'>
            Already have an account? 
            <Link 
              to='/signin' 
              className='text-green-700 underline transition hover:text-green-600 duration-300'
            >
              Sign in
            </Link>
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='mb-4 flex gap-2 w-full'>
            <div className='w-1/2 rounded-xl bg-gray-200'>
              <input
                {...register('firstName')}
                className='w-full h-full p-3 rounded-xl text-sm font-pregular bg-transparent focus:outline-green-300 focus:bg-white focus:shadow-md'
                type="text"
                placeholder='First name'
              />
              {errors.firstName && (
                <p className='text-red-500 text-xs mt-1 pl-3'>
                  {errors.firstName.message}
                </p>
              )}
            </div>
            <div className='w-1/2 rounded-xl bg-gray-200'>
              <input
                {...register('lastName')}
                className='w-full h-full p-3 rounded-xl text-sm font-pregular bg-transparent focus:outline-green-300 focus:bg-white focus:shadow-md'
                type="text"
                placeholder='Last name'
              />
              {errors.lastName && (
                <p className='text-red-500 text-xs mt-1 pl-3'>
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          <div className='mb-4 flex gap-2 w-full'>
            <div className='w-full rounded-xl bg-gray-200'>
              <input
                {...register('email')}
                className='w-full h-full p-3 rounded-xl text-sm font-pregular bg-transparent focus:outline-green-300 focus:bg-white focus:shadow-md'
                type="email"
                placeholder='Email address'
              />
              {errors.email && (
                <p className='text-red-500 text-xs mt-1 pl-3'>
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          <div className='mb-4 flex gap-2 w-full'>
            <div className='w-full rounded-xl bg-gray-200'>
              <input
                {...register('matricNo')}
                className='w-full h-full p-3 rounded-xl text-sm font-pregular bg-transparent focus:outline-green-300 focus:bg-white focus:shadow-md'
                type="text"
                placeholder='Matriculation number'
              />
              {errors.matricNo && (
                <p className='text-red-500 text-xs mt-1 pl-3'>
                  {errors.matricNo.message}
                </p>
              )}
            </div>
          </div>

          <div className='w-full'>
            <div className='w-full rounded-xl bg-gray-200'>
              <input
                {...register('password')}
                className='w-full h-full p-3 rounded-xl text-sm font-pregular bg-transparent focus:outline-green-300 focus:bg-white focus:shadow-md'
                type="password"
                placeholder='Password'
              />
              {errors.password && (
                <p className='text-red-500 text-xs mt-1 pl-3'>
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          <div className='mt-4'>
            <button 
              type="submit"
              disabled={isLoading}
              className='bg-green-600 flex justify-center w-full p-2 rounded-xl text-white font-normal hover:scale-[.95] transition duration-250 disabled:opacity-50'
            >
              {isLoading ? 
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" opacity=".25"/><path fill="currentColor" d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z"><animateTransform attributeName="transform" dur="0.75s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"/></path></svg>
              : 'Sign up'
              }
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Signup;