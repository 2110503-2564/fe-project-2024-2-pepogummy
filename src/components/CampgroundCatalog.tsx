import Card from '@/components/Card';
import Link from 'next/link';
import { CampgroundJson } from "../../interface";

export default async function CampgroundCatalog({ campgroundsJson }: { campgroundsJson: Promise<CampgroundJson> }) {
    const { success, count, data } = await campgroundsJson;

    if (!success) return <p className='text-center text-red-500 font-semibold'>Failed to load campgrounds</p>;

    return (
        <div className='py-12 px-6 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 min-h-screen'>
            <h2 className='text-3xl font-semibold text-center text-gray-800 mb-4'>
                Discover Campgrounds
            </h2>
            <p className='text-lg text-center text-gray-600 mb-10'>
                Explore {count} beautiful locations
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {data.map((campground) => (
                    <Link 
                        href={`/campground/${campground._id}`}
                        key={campground._id}
                        className='hover:scale-105 transition-transform duration-300 ease-out'
                    >
                        <Card
                            campgroundName={campground.name}
                            tel={campground.tel}
                            address={campground.address}
                        />
                    </Link>
                ))}
            </div>
        </div>
    );
}
