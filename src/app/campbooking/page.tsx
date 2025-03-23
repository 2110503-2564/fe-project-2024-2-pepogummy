"use client";
import DateReserve from "@/components/DateReserve";
import { Select, MenuItem, TextField, Button } from "@mui/material";
import { useState } from "react";
import { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { BookingItem } from "../../../interface";
import { addBooking } from "@/redux/features/bookSlice";

export default function Page() {
  const [nameLastname, setNameLastname] = useState<string | null>(null);
  const [tel, setTel] = useState<string | null>(null);
  const [venue, setVenue] = useState<string | null>(null);
  const [bookDate, setBookDate] = useState<Dayjs | null>(null);

  const dispatch = useDispatch<AppDispatch>();

  const makeReservation = () => {
    if (nameLastname && tel && venue && bookDate) {
      const item: BookingItem = {
        nameLastname: nameLastname,
        tel: tel,
        venue: venue,
        bookDate: dayjs(bookDate).format("YYYY/MM/DD"),
      };
      dispatch(addBooking(item));
    }
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNameLastname(event.target.value);
  };

  const handleTelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTel(event.target.value);
  };

  return (
    <main className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4"
    style={{
        backgroundImage: "url('/img/cover.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
        
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Book Your CampGround
        </h1>

        <TextField
          name="Name-Lastname"
          label="Name-Lastname"
          variant="outlined"
          fullWidth
          value={nameLastname}
          className="mb-4"
          onChange={handleNameChange}
        />

        <TextField
          name="Contact-Number"
          label="Contact-Number"
          variant="outlined"
          fullWidth
          value={tel}
          className="mb-4"
          onChange={handleTelChange}
        />

        <Select
          variant="outlined"
          fullWidth
          id="venue"
          name="venue"
          value={venue}
          onChange={(e) => setVenue(e.target.value)}
          className="mb-4"
        >
          <MenuItem value="Bloom">The Bloom Pavilion</MenuItem>
          <MenuItem value="Spark">Spark Space</MenuItem>
          <MenuItem value="GrandTable">The Grand Table</MenuItem>
        </Select>

        <DateReserve
          onDateChange={(value: Dayjs) => setBookDate(value)}
          className="mb-6"
        />

        <Button
          variant="contained"
          fullWidth
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2"
          onClick={makeReservation}
        >
          Book CampGround
        </Button>
      </div>
    </main>
  );
}