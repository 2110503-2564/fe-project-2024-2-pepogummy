"use client"
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import DateReserve from "@/components/DateReserve";
import { Dayjs } from "dayjs";
import dayjs from "dayjs";
import updateBooking from "@/libs/updateBooking";
import { Select, MenuItem, CircularProgress } from "@mui/material";
import getCampgrounds from "@/libs/getCampgrounds";
import { CampgroundItem } from "../../../../../interface";
import { UpdateBookingData } from "../../../../../interface";

export default function EditBookingPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const params = useParams();
  const bookingid = params.bookingid as string;
  const [date, setDate] = useState<Dayjs | null>(null);
  const [campgrounds, setCampgrounds] = useState<CampgroundItem[]>([]);
  const [selectedCampground, setSelectedCampground] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [campgroundsResponse] = await Promise.all([
          getCampgrounds(),
        ]);
        
        setCampgrounds(campgroundsResponse.data);
        setInitialLoading(false);
      } catch (error) {
        console.error("Failed to load data:", error);
        setError("Failed to load required data");
        setInitialLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingid || !session?.user.token || !date || !selectedCampground) {
      setError("Missing required information");
      return;
    }

    if (date.isBefore(dayjs().startOf('day'))) {
      setError("Cannot book a past date");
      return;
    }

    try {
      setLoading(true);
      setError("");
      
      await updateBooking(
        bookingid,
        { 
          apptDate: date.toISOString(),
          campground: selectedCampground
        },
        session.user.token
      );

      router.push("/mybooking");
    } catch (err) {
      console.error("Update failed:", err);
      setError(err instanceof Error ? err.message : "Failed to update booking");
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <CircularProgress />
          <p className="mt-4 text-gray-600">Loading booking information...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Edit Booking
        </h1>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Campground
            </label>
            <Select
                fullWidth
                value={selectedCampground}
                onChange={(e) => setSelectedCampground(e.target.value)}
                className="bg-white"
                displayEmpty
                renderValue={(value) => 
                    value ? value : (
                    <span>Select Campground</span>
                    )
                }
                >
                <MenuItem value="" disabled>
                    Select Campground
                </MenuItem>
                {campgrounds.map((cg) => (
                    <MenuItem key={cg._id} value={cg._id}>
                    {cg.name}
                    </MenuItem>
                ))}
            </Select>
          </div>

          <DateReserve onDateChange={(value: Dayjs) => setDate(value)} />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-300"
          >
            {loading ? "Updating..." : "Update Booking"}
          </button>
        </form>
      </div>
    </div>
  );
}