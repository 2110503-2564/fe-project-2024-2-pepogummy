'use client'
import InteractiveCard from './InteractiveCard'
import { Rating } from "@mui/material";
import { useState } from 'react';

export default function Card({ 
    campgroundName,
    address,
    province,
    tel,
    onRating 
}: { 
    campgroundName: string, 
    address: string,
    province: string,
    tel: string,
    onRating?: (rating: number, campground: string) => void 
}) {
    const [value, setValue] = useState<number | null>(0);

    return (
        <InteractiveCard>
            <div className='w-full h-full p-3 flex flex-col space-y-2'>
                <div className='grid grid-cols-3 gap-2 text-sm'>
                    <span className='text-gray-800 font-medium col-span-1'>Name:</span>
                    <span className='text-gray-800 font-semibold col-span-2 line-clamp-1'>
                        {campgroundName}
                    </span>

                    <span className='text-gray-800 font-medium col-span-1'>Address:</span>
                    <span className='text-gray-600 col-span-2 line-clamp-2'>
                        {address}
                    </span>

                    <span className='text-gray-800 font-medium col-span-1'>Province:</span>
                    <span className='text-gray-600 col-span-2'>{province}</span>

                    <span className='text-gray-800 font-medium col-span-1'>Tel:</span>
                    <span className='text-gray-600 col-span-2'>{tel}</span>
                </div>

                {onRating && 
                    <Rating 
                        name={campgroundName + ' Rating'} 
                        size="small"
                        data-testid={campgroundName + ' Rating'} 
                        defaultValue={0} 
                        precision={0.5}
                        onChange={(e, newValue) => {
                            setValue(newValue);
                            onRating(newValue ?? 0, campgroundName);
                        }}
                        onClick={(e) => e.stopPropagation()}
                        className='mt-1'
                    />
                }
            </div>
        </InteractiveCard>
    )
}