import getCampground from '@/libs/getCampground';
import { CampgroundResponse } from '../../../../../interface';

export default async function CampgroundDetailPage({ params }: { params: { campid: string } }) {
  try {
    const campgroundDetail: CampgroundResponse = await getCampground(params.campid);

    return (
      <main className="max-w-4xl mx-auto p-5 text-gray-800">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold mb-4">{campgroundDetail.data.name}</h1>
          
          <div className="grid grid-cols-2 gap-4 text-lg">
            <div className="col-span-2">
              <span className="font-semibold">Address:</span> {campgroundDetail.data.address}
            </div>
            <div>
              <span className="font-semibold">District:</span> {campgroundDetail.data.district}
            </div>
            <div>
              <span className="font-semibold">Province:</span> {campgroundDetail.data.province}
            </div>
            <div>
              <span className="font-semibold">Postal Code:</span> {campgroundDetail.data.postalcode}
            </div>
            <div>
              <span className="font-semibold">Region:</span> {campgroundDetail.data.region}
            </div>
            <div>
              <span className="font-semibold">Tel:</span> {campgroundDetail.data.tel}
            </div>
          </div>
        </div>
      </main>
    );
  } catch (error) {
    return (
      <main className="max-w-4xl mx-auto p-5 text-gray-800">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
          <p className="font-semibold">Error:</p>
          <p>{(error as Error).message}</p>
          <p className="mt-2 text-sm">Campground ID: {params.campid}</p>
        </div>
      </main>
    );
  }
}