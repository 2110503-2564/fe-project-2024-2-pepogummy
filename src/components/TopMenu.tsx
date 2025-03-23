import styles from './topmenu.module.css';
import TopMenuItem from './TopMenuItem';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';

export default async function TopMenu() {
  const session = await getServerSession(authOptions);

  return (
    <div className="fixed top-0 left-0 right-0 z-30 h-[60px] bg-white shadow-md flex items-center justify-between px-8">
      <div className="flex items-center space-x-8">
        <Link href={'/'}>
        <div className="text-2xl font-bold text-blue-600">Campground Booking</div>
        </Link>
        <TopMenuItem title="My Booking" pageRef="/mybooking" />
        <TopMenuItem title="Booking" pageRef="/campbooking" />
      </div>

      <div className="flex items-center space-x-6">
        {session ? (
          <>
            <Link href="/api/auth/signout">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300">
                Sign Out
              </button>
            </Link>
          </>
        ) : (
          <>
            <Link href="/api/auth/signin">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300">
                Sign In
              </button>
            </Link>
            <Link href="/signup">
              <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300">
                Sign Up
              </button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}