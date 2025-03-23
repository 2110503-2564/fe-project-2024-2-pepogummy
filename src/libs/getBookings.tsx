interface BookingJson {
    success: boolean;
    count: number;
    data: any[];
}

export default async function getBookings(): Promise<BookingJson> {
    const response = await fetch("http://campgroundbooking.us-east-1.elasticbeanstalk.com/api/v1/bookings");
    if (!response.ok) {
        throw new Error("Failed to fetch bookings");
    }
    return await response.json();
}
