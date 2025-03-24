import getCampground from '@/libs/getCampground';
import { CampgroundResponse } from '../../../../../interface';

export default async function CampgroundDetailPage({ params }: { params: { campid: string } }) {
  try {
    const campgroundDetail: CampgroundResponse = await getCampground(params.campid);

    return (
      <main className="max-w-4xl mx-auto p-5">
        {/* Card Container */}
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-6">
            <h1 className="text-3xl font-bold text-white">
              {campgroundDetail.data.name}
            </h1>
          </div>

          {/* Details Section */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
              {/* Address */}
              <div className="col-span-2">
                <p className="text-lg">
                  <span className="font-semibold text-blue-600">Address:</span> {campgroundDetail.data.address}
                </p>
              </div>

              {/* District */}
              <div>
                <p className="text-lg">
                  <span className="font-semibold text-blue-600">District:</span> {campgroundDetail.data.district}
                </p>
              </div>

              {/* Province */}
              <div>
                <p className="text-lg">
                  <span className="font-semibold text-blue-600">Province:</span> {campgroundDetail.data.province}
                </p>
              </div>

              {/* Postal Code */}
              <div>
                <p className="text-lg">
                  <span className="font-semibold text-blue-600">Postal Code:</span> {campgroundDetail.data.postalcode}
                </p>
              </div>

              {/* Region */}
              <div>
                <p className="text-lg">
                  <span className="font-semibold text-blue-600">Region:</span> {campgroundDetail.data.region}
                </p>
              </div>

              {/* Tel */}
              <div>
                <p className="text-lg">
                  <span className="font-semibold text-blue-600">Tel:</span> {campgroundDetail.data.tel}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  } catch (error) {
    return (
      <main className="max-w-4xl mx-auto p-5">
        {/* Error Message */}
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
          <p className="font-semibold text-red-700">Error:</p>
          <p className="text-red-600">{(error as Error).message}</p>
          <p className="mt-2 text-sm text-red-600">Campground ID: {params.campid}</p>
        </div>
      </main>
    );
  }
}