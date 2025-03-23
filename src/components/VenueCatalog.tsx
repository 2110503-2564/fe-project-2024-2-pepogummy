import Card from '@/components/Card';
import Link from 'next/link'
import { VenueItem, VenueJson } from "../../interface"
export default async function VenueCatalog({venuesJson} : {venuesJson:Promise<VenueJson>}){
    const venuesJsonReady = await venuesJson;
    return (
        <div>
        <p className='text-xl text-center mt-4'>Explore { venuesJsonReady.count } fabulous venues in our catalog</p>
        <div style={{ margin: "10px", padding: "15px", display: "flex", flexDirection: "row", alignContent: "space-around", flexWrap: "wrap" }}>
                {
                    venuesJsonReady.data.map((cardItem: VenueItem)=>(
                        <Link href={`/venue/${cardItem.id}`} className='w-1/5 mx-4'>
                        <Card venueName={cardItem.name} imgSrc={cardItem.picture} />
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}