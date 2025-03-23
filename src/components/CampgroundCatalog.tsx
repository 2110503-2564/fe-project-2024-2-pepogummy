import Card from '@/components/Card';
import Link from 'next/link';
import { CampgroundJson } from "../../interface";

export default async function CampgroundCatalog({ campgroundsJson }: { campgroundsJson: Promise<CampgroundJson> }) {
    const { success, count, data } = await campgroundsJson;

    if (!success) return <p className='text-center text-red-500'>Failed to load campgrounds</p>;

    return (
        <div className='py-4'>
            <p className='text-lg text-center text-gray-600 mb-4'>
                Explore {count} campgrounds
            </p>
            <div className="px-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {data.map((campground) => {
                return (
                    <Link 
                    href={`/campground/${campground._id}`}
                    key={campground._id}
                    className='hover:shadow-md transition-shadow'
                    >
                    <Card 
                        campgroundName={campground.name}
                        address={campground.address}
                        province={campground.province}
                        tel={campground.tel}
                    />
                    </Link>
                )
                })}
            </div>
        </div>
    )
}