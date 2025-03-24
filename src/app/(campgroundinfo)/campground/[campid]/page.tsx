import getCampground from '@/libs/getCampground';
import { CampgroundResponse } from '../../../../../interface';

export default async function CampgroundDetailPage({ params }: { params: { campid: string } }) {
  try {
    const campgroundDetail: CampgroundResponse = await getCampground(params.campid);

    return (
      <main className="flex flex-col min-h-screen bg-gradient-to-b from-gray-300 via-gray-400 to-gray-500">

        <div className="flex-grow">
          <div className="max-w-4xl mx-auto p-6">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-16 mt-8">
              <div className="bg-gradient-to-r from-indigo-600 to-indigo-500 p-8">
                <h1 className="text-4xl font-extrabold text-white tracking-wide">
                  {campgroundDetail.data.name}
                </h1>
              </div>

              <div className="p-8 space-y-6 bg-gray-50">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-800">
                  <div className="col-span-2">
                    <p className="text-xl">
                      <span className="font-semibold text-indigo-600">Address:</span> {campgroundDetail.data.address}
                    </p>
                  </div>

                  <div>
                    <p className="text-xl">
                      <span className="font-semibold text-indigo-600">District:</span> {campgroundDetail.data.district}
                    </p>
                  </div>

                  <div>
                    <p className="text-xl">
                      <span className="font-semibold text-indigo-600">Province:</span> {campgroundDetail.data.province}
                    </p>
                  </div>

                  <div>
                    <p className="text-xl">
                      <span className="font-semibold text-indigo-600">Postal Code:</span> {campgroundDetail.data.postalcode}
                    </p>
                  </div>

                  <div>
                    <p className="text-xl">
                      <span className="font-semibold text-indigo-600">Region:</span> {campgroundDetail.data.region}
                    </p>
                  </div>

                  <div>
                    <p className="text-xl">
                      <span className="font-semibold text-indigo-600">Tel:</span> 
                      <a href={`tel:${campgroundDetail.data.tel}`} className="text-indigo-600 hover:underline">
                        {campgroundDetail.data.tel}
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

    );
  } catch (error) {
    return (
      <main className="max-w-4xl mx-auto p-6 bg-gray-100">
        <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg shadow-md">
          <p className="font-semibold text-red-700 text-lg">Error:</p>
          <p className="text-red-600 text-lg">{(error as Error).message}</p>
          <p className="mt-2 text-sm text-red-600">Campground ID: {params.campid}</p>
        </div>
      </main>
    );
  }
}
