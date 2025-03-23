'use client'
import Image from 'next/image'
import InteractiveCard from './InteractiveCard'
import { Rating } from "@mui/material";
import { useState } from 'react';

export default function Card({ venueName, imgSrc, onRating }: { venueName: string, imgSrc : string, onRating?: (rating: number, venue: string) => void }) {

  const [value, setValue] = useState<number | null>(0);

  return (
    <InteractiveCard>
        <div className='w-full relative h-[70%] rounded-t-lg'>
            <Image src={imgSrc} alt='card image' priority fill={true} className='object-cover rounded-t-lg'/>
        </div>
        <div className='w-full h-[30%] p-4 flex flex-col'>
          <span className='text-lg'>
            {venueName}
          </span>
            { onRating ? 
            <Rating name={venueName + ' Rating'} id={venueName + ' Rating'} data-testid={venueName + ' Rating'} defaultValue={0} precision={0.5} 
            onChange={(e, newValue) => {
              setValue(newValue);
              onRating(newValue ?? 0, venueName); // ถ้า newValue เป็น null มันจะคืนค่า 0
          }}
          onClick={(e) => {e.stopPropagation();}}/> : ''}
        </div>
    </InteractiveCard>
  )
}
