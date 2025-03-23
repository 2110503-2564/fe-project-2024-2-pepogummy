'use client'
import { useState } from 'react';
import styles from './banner.module.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function Banner() {
  const [banner, setBanner] = useState(0);
  const bannerList = [
    '/img/cover.jpg',
    '/img/cover2.jpg',
    '/img/cover3.jpg',
    '/img/cover4.jpg',
  ]
  const router = useRouter();
  const { data: session } = useSession();
  console.log(session?.user.token)
  return (
    <div className={styles.Banner} onClick={()=> {setBanner((banner+1)%4)}} >
        <Image src={bannerList[banner]} alt='cover' fill={true} objectFit='cover'/>
        <div className={styles.BannerText}>
            <h1 className='text-3xl'>where every event finds its venue</h1>
            <h3 className='text-xl'>Finding the perfect venue has never been easier. Whether It's a wedding, corperate event, or private party, we connecting people to the perfect place.</h3>
        </div>
        {
          session ? <div className='z-30 absolute top-[12px] right-[12px] text-2xl'>Welcome {session.user?.name} </div> : null
        }
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded z-30 absolute bottom-[12px] right-[12px]" 
      onClick={(e)=> {router.push('/venue'); e.stopPropagation()}}>
        Select Venue
      </button>
    </div>

  )
}