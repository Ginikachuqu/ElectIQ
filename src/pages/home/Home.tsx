import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../../lib/supabaseclient'
import toast from 'react-hot-toast'

type Props = {}

const Home = (props: Props) => {
    const [ election, setElection ] = useState()

    useEffect(() => {
        const fetchElection = async () => {
            try {
            const { data: Election, error } = await supabase
                .from('Election')
                .select('*')
                .eq('isActive', true);

            if (error || !Election || Election.length === 0) {
                throw new Error('No record found');
            }

            setElection(Election);
            } catch (error) {
            toast.error((error as Error).message);
            }
        };

        fetchElection();
    }, []);


  return (
    <section className='px-[4rem]'>
        <div className='h-screen w-full flex items-center justify-center'>
            {
                election ? (
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
                ) : 'No active record found'
            }
        </div>
    </section>
  )
}

export default Home