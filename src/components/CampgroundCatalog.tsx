import Card from '@/components/Card';
import Link from 'next/link'
import { CampgroundItem, CampgroundJson } from "../../interface"

export default async function CampgroundCatalog({campgroundsJson} : {campgroundsJson:Promise<CampgroundJson>}){
    const campgroundsJsonReady = await campgroundsJson;
    return (
        <div className='py-4'>
            <p className='text-lg text-center text-gray-600 mb-4'>
                Explore {campgroundsJsonReady.count} campgrounds
            </p>
            <div className="px-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {
                    campgroundsJsonReady.data.map((cardItem: CampgroundItem) => (
                        <Link 
                            href={`/campgrounds/${cardItem._id}`} 
                            key={cardItem._id}
                            className='hover:shadow-md transition-shadow'
                        >
                            <Card 
                                campgroundName={cardItem.name}
                                address={cardItem.address}
                                province={cardItem.province}
                                tel={cardItem.tel}
                            />
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}