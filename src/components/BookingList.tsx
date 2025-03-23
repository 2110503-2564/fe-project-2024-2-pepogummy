"use client"
import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "@/redux/store";
import { removeBooking, setBookings } from "@/redux/features/bookSlice";
import getBookings from "@/libs/getBookings";
import { useSession } from "next-auth/react";
import Link from "next/link";
import deleteBooking from "@/libs/deleteBooking";

export default function BookingList() {
  const { data: session } = useSession();
  const dispatch = useAppDispatch();
  const bookItems = useAppSelector((state) => state.bookSlice.bookItems);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      if (session?.user.token) {
        try {
          setLoading(true);
          setError("");
          const bookings = await getBookings(session.user.token);
          dispatch(setBookings(bookings.data));
        } catch (error) {
          console.error("Failed to load bookings:", error);
          setError("Failed to load bookings");
        } finally {
          setLoading(false);
        }
      }
    };
    fetchBookings();
  }, [session, dispatch]);

  const handleDelete = async (bookingId: string) => {
    if (!session?.user.token) return;
    
    try {
      await deleteBooking(bookingId, session.user.token);
      dispatch(removeBooking(bookingId));
    } catch (error) {
      console.error("Delete failed:", error);
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
        {bookItems.length === 0 ? (
          <div className="text-center p-12 bg-gray-50">
            <p className="text-xl text-gray-600 font-medium mb-2">No bookings found</p>
            <p className="text-gray-400">Get started by creating a new booking</p>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50">
            <tr className="text-gray-500 text-sm font-medium">
                <th className="p-4 text-left font-normal">Campground</th>
                <th className="p-4 text-left font-normal">Contact</th>
                <th className="p-4 text-left font-normal">Booking Date</th>
                <th className="p-4 text-left font-normal">Created At</th>
                <th className="p-4 text-left font-normal">Actions</th>
            </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
            {bookItems.map((booking) => (
                <tr key={booking._id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4 text-gray-700 font-medium">{booking.campground.name}</td>
                  <td className="p-4 text-gray-500">{booking.campground.tel}</td>
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
                      <Link
                        href={`/mybooking/${booking._id}/edit`}
                        className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        Edit
                      </Link>
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