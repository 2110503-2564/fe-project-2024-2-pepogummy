import styles from './topmenu.module.css'
import Image from 'next/image'
import TopMenuItem from './TopMenuItem'
import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions'

export default async function TopMenu() {
  const session = await getServerSession(authOptions);
  return (
    <div className="fixed top-0 left-0 right-0 z-30 flex flex-row h-[50px] bg-white border-t border-b border-gray-300 justify-between">
      <div className='flex items-center ml-4'>
        <div className='text-xl ml-8'>Campground Booking</div>
        <TopMenuItem title='My Booking' pageRef='/mybooking/'/>
      </div>
      <div className='flex flex-row-reverse items-center mx-8 bg-red-200 w-[50%]'>
      {
          session ? 
          <Link href='/api/auth/signout'>
            <button className="bg-blue-500 hover:bg-blue-700 text-white text-md font-bold py-2 px-4 rounded">
              Sign-Out of {session.user?.name}
            </button>
          </Link> : 
          <Link href='/api/auth/signin'>
            <button className="bg-blue-500 hover:bg-blue-700 text-white text-md font-bold py-2 px-4 rounded">
              Sign-In
            </button>
          </Link>
        }
        {
          session ?
          <div className='mx-4'>สถานะ: {session.user?.role}</div>:
          null
        }
        <TopMenuItem title='Booking' pageRef='/booking/' />
      </div>
    </div>
  )
}
