import { BookingJson } from "../../interface";

export default async function getBookings(token: string): Promise<BookingJson> {
  const response = await fetch(
    "http://campgroundbooking.us-east-1.elasticbeanstalk.com/api/v1/bookings",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to fetch bookings");
  }
  
  return await response.json();
}