interface Booking {
    _id: string;
    apptDate: string;
    user: string;
    campground: string;
    createdAt: string;
}

export default async function getBooking(id: string, token: string): Promise<Booking> {
    const response = await fetch(`http://campgroundbooking.us-east-1.elasticbeanstalk.com/api/v1/bookings/${id}`, {
        headers: {
            authorization: `Bearer ${token}`,
        },
    });
    if (!response.ok) {
        throw new Error("Failed to fetch booking");
    }
    return await response.json();
}