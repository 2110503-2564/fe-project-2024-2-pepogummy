import Card from '@/components/Card';
import Link from 'next/link';
import { CampgroundJson } from "../../interface";

export default async function CampgroundCatalog({ campgroundsJson }: { campgroundsJson: Promise<CampgroundJson> }) {
    const { success, count, data } = await campgroundsJson;

    if (!success) return <p className='text-center text-red-500'>Failed to load campgrounds</p>;

    return (
        <div className='py-8 px-4'>
            <h2 className='text-2xl font-bold text-center text-gray-800 mb-2'>
                Discover Campgrounds
            </h2>
            <p className='text-lg text-center text-gray-600 mb-8'>
                Explore {count} beautiful locations
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {data.map((campground) => (
                    <Link 
                        href={`/campground/${campground._id}`}
                        key={campground._id}
                        className='hover:scale-105 transition-transform duration-300'
                    >
                        <Card
                            campgroundName={campground.name}
                            tel={campground.tel}
                            address={campground.address}
                        />
                    </Link>
                ))}
            </div>
            
            {count > 0 && (
                <p className='text-center text-gray-500 mt-8'>
                    Showing {count} campgrounds
                </p>
            )}
        </div>
    );
}
