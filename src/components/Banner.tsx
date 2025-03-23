'use client';
import { useState } from 'react';
import styles from './banner.module.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function Banner() {
  const [banner, setBanner] = useState(0);
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <div
      className={styles.Banner}
    >
      <Image
        src={"/img/cover4.jpeg"}
        alt='cover4'
        fill={true}
        objectFit='cover'
        className='brightness-75'
      />
      <div className={styles.BannerText}>
        <h1 className='text-5xl font-bold text-white mb-4 drop-shadow-lg'>
          Your Adventure Awaits
        </h1>
        <h3 className='text-2xl text-white max-w-2xl text-center drop-shadow-lg'>
          Discover the perfect campground for your next outdoor escape. Whether it's a family trip, a romantic getaway, or a solo adventure, we've got you covered.
        </h3>
      </div>
      {session && (
        <div className='z-30 absolute top-4 right-4 text-2xl text-white font-semibold drop-shadow-lg'>
          Welcome, {session.user?.name}!
        </div>
      )}
      <button
        className='z-30 absolute bottom-8 right-8 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition duration-300 transform hover:scale-105'
        onClick={(e) => {
          router.push('/venue');
          e.stopPropagation();
        }}
      >
        Explore Campgrounds
      </button>
    </div>
  );
}