"use client";
import { BookingItem } from "../../../../interface";
import getBookings from "@/libs/getBookings";
import BookingTable from "@/components/BookingTable";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function BookingManagement() {
  const { data: session } = useSession();
  const [bookings, setBookings] = useState<BookingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      if (session?.user.token) {
        try {
          setLoading(true);
          setError("");
          const result = await getBookings(session.user.token);
          setBookings(result.data);
        } catch (err) {
          console.error("Failed to fetch bookings:", err);
          setError("Failed to load bookings");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchBookings();
  }, [session]);

  if (loading) {
    return <div className="text-center p-8">Loading bookings...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 p-8">{error}</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Booking Management</h1>
      <BookingTable initialBookings={bookings} />
    </div>
  );
}