"use client";
import DateReserve from "@/components/DateReserve";
import { Select, MenuItem, Button, CircularProgress } from "@mui/material";
import { useState, useEffect } from "react";
import { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { CampgroundItem } from "../../../interface";
import getCampgrounds from "@/libs/getCampgrounds";
import createBooking from "@/libs/createBooking";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Page() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [campgrounds, setCampgrounds] = useState<CampgroundItem[]>([]);
  const [campgroundId, setCampgroundId] = useState<string>("");
  const [bookDate, setBookDate] = useState<Dayjs | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/api/auth/signin");
    }
  }, [status, router]);

  useEffect(() => {
    const fetchCampgrounds = async () => {
      try {
        const response = await getCampgrounds();
        if (response.success) {
          setCampgrounds(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch campgrounds:", error);
        setError("Failed to load campgrounds");
      } finally {
        setLoading(false);
      }
    };
    
    if (status === "authenticated") {
      fetchCampgrounds();
    }
  }, [status]);

  if (status === "loading") {
    return (
      <div className="w-full min-h-screen flex flex-col items-center justify-center">
        <CircularProgress />
      </div>
    );
  }

  const handleBooking = async () => {
    if (!session || !session.user.token) {
      setError("Please login to make a booking");
      return;
    }

    if (!campgroundId || !bookDate) {
      setError("Please select a campground and date");
      return;
    }

    if (bookDate.isBefore(dayjs().startOf('day'))) {
      setError("Cannot book a past date");
      return;
    }

    try {
      setSubmitting(true);
      setError("");
      
      await createBooking(
        dayjs(bookDate).toDate(),
        campgroundId,
        session.user._id,
        session.user.token
      );

      alert("Booking created successfully!");
      
    } catch (err) {
      console.error("Booking failed:", err);
      setError(err instanceof Error ? err.message : "Booking failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4"
      style={{
        backgroundImage: "url('/img/cover.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md opacity-[90%]">
        <h1 className="text-2xl font-bold text-center text-slate-500 mb-6">
          Book Your Campground
        </h1>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center">
            <CircularProgress />
            <p className="mt-2">Loading campgrounds...</p>
          </div>
        ) : (
          <>
            <Select
              variant="outlined"
              fullWidth
              value={campgroundId}
              onChange={(e) => setCampgroundId(e.target.value)}
              className="mb-4"
              displayEmpty
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

            <DateReserve
              onDateChange={(value: Dayjs) => setBookDate(value)}
            />

            <Button
              variant="contained"
              fullWidth
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2"
              onClick={handleBooking}
              disabled={submitting || !campgroundId || !bookDate}
            >
              {submitting ? <CircularProgress size={24} /> : "Book Campground"}
            </Button>
          </>
        )}
      </div>
    </main>
  );
}