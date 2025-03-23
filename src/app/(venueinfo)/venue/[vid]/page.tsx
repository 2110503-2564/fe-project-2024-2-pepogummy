import Image from 'next/image'
import getVenue from '@/libs/getVenue'
export default async function detailPage( {params} : { params : {vid:string}}) {
  const venueDetail = await getVenue(params.vid);

  return (
    <main className='text-center p-5 justify-center flex'>
      <div className='shadow-xl rounded-xl bg-slate-100'>
        <h1 className='text-3xl mt-4'>{venueDetail.data.name}</h1>
        <div className='flex flex-row my-5 px-4 py-8 items-center'>
              <Image src={venueDetail.data.picture} alt='card image' width={0} height={0} sizes='100vW' className='object-cover rounded-t-lg w-[50%] h-48 mr-4'/>
              <div className='flex flex-col items-start'>
                <h5 className='text-xl'>Name: {venueDetail.data.name}</h5>
                <h5 className='text-xl'>Address: {venueDetail.data.address}</h5>
                <h5 className='text-xl'>District: {venueDetail.data.district}</h5>
                <h5 className='text-xl'>Postal Code: {venueDetail.data.postalcode}</h5>
                <h5 className='text-xl'>Tel: {venueDetail.data.tel}</h5>
                <h5 className='text-xl'>Daily Rate: {venueDetail.data.dailyrate}</h5>
              </div>
          </div>
      </div>
    </main>
  )
}
