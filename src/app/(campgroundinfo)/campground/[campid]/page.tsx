import getCampground from '@/libs/getCampground';

export default async function CampgroundDetailPage({ params } : { params: { id: string } }) {
    const campgroundDetail = await getCampground(params.id);

    return (
        <main className="max-w-4xl mx-auto p-5">
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
    )
}