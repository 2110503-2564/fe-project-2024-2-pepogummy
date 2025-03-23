export default async function updateBooking(id: string, data: any, token: string) {
    const response = await fetch(`http://campgroundbooking.us-east-1.elasticbeanstalk.com/api/v1/bookings/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        throw new Error("Failed to update booking");
    }
    return await response.json();
}