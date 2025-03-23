export default async function createBooking(apptDate: Date, campground: string, token: string) {
    const response = await fetch("http://campgroundbooking.us-east-1.elasticbeanstalk.com/api/v1/bookings", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            apptDate,
            campground
        }),
    });
    if (!response.ok) {
        throw new Error("Failed to create booking");
    }
    return await response.json();
}