"use client"
import React from 'react';
import { useReducer } from 'react';
import Card from '@/components/Card';
import Link from 'next/link'

export default function CardPanel() {
    const cardReducer = (ratingList: Map<string, number>, action: { type: string; venue: string; rating: number }) => {
        switch (action.type) {
            case 'RATING': {
                return new Map(ratingList).set(action.venue, action.rating);
            } case 'REMOVE': {
                ratingList.delete(action.venue);
                return new Map(ratingList);
            }
            default:
                return ratingList;
        }
    };

    const [venueRatings, dispatch] = useReducer(
        cardReducer,
        new Map([
            ["The Bloom Pavilion", 0],
            ["Spark Space", 0],
            ["The Grand Table", 0],
        ])
    );

    /* Mock data */
    const mockCardRepo = [
        {
            vid: "001",
            name: "The Bloom Pavilion",
            image: "/img/bloom.jpg"
        },
        {
            vid: "002",
            name: "Spark Space",
            image: "/img/sparkspace.jpg"
        },
        {
            vid: "003",
            name: "The Grand Table",
            image: "/img/grandtable.jpg"
        }
    ]

    return (
        <div>
            <div style={{ margin: "20px", padding: "15px", display: "flex", flexDirection: "row", alignContent: "space-around", flexWrap: "wrap" }}>
                {
                    mockCardRepo.map((cardItem)=>(
                        <Link href={`/venue/${cardItem.vid}`} className='w-1/5 mx-4'>
                        <Card venueName={cardItem.name} imgSrc={cardItem.image} onRating={(rating, venue) => dispatch({ type: 'RATING', venue, rating })} />
                        </Link>
                    ))
                }
            </div>
            <div className='flex flex-col p-8'>
                <span className='text-lg'>Venue List with Ratings: {venueRatings.size}</span>
                {Array.from(venueRatings).map(([venue, rating]) => (
                    <div key={venue} data-testid={venue} onClick={() => dispatch({type: 'REMOVE', venue: venue, rating})}>{venue} : {rating}</div>
                ))}
            </div>
        </div>
    );
}