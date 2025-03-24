"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import deleteBooking from "@/libs/deleteBooking";
import { BookingItem } from "../../interface";
import getBookings from "@/libs/getBookings";


export default function BookingTable({ initialBookings }: { initialBookings: BookingItem[] }) {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [bookingData, setBookings] = useState<BookingItem[]>(initialBookings);

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

  const handleDelete = async (bookingId: string) => {
    if (!session?.user.token) return;
    
    try {
      await deleteBooking(bookingId, session.user.token);
      setBookings(prev => prev.filter(booking => booking._id !== bookingId));
    } catch (err) {
      console.error("Delete failed:", err);
      setError("Failed to delete booking");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-gray-500 text-lg">Loading bookings...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-center max-w-md p-4 rounded-lg bg-red-50">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {bookingData.length === 0 ? (
          <div className="text-center p-12 bg-gray-50">
            <p className="text-xl text-gray-600 font-medium mb-2">No bookings found</p>
            <p className="text-gray-400">There are currently no bookings in the system</p>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr className="text-gray-500 text-sm font-medium">
                <th className="p-4 text-left font-normal">User</th>
                <th className="p-4 text-left font-normal">Email</th>
                <th className="p-4 text-left font-normal">Campground</th>
                <th className="p-4 text-left font-normal">Booking Date</th>
                <th className="p-4 text-left font-normal">Created At</th>
                <th className="p-4 text-left font-normal">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {bookingData.map((booking) => (
                <tr key={booking._id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4 text-gray-700 font-medium">{booking.user.name}</td>
                  <td className="p-4 text-gray-500">{booking.user.email}</td>
                  <td className="p-4 text-gray-600">{booking.campground.name}</td>
                  <td className="p-4 text-gray-600">
                    {new Date(booking.apptDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </td>
                  <td className="p-4 text-gray-600">
                    {new Date(booking.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleDelete(booking._id)}
                        className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}