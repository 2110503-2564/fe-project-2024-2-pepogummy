"use client"
import DateReserve from "@/components/DateReserve"
import { Select, MenuItem, TextField } from "@mui/material";
import { useState } from "react";
import { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { useDispatch, UseDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { BookingItem } from "../../../interface";
import { addBooking  } from "@/redux/features/bookSlice";

export default function Page() {
  const [ nameLastname, setNameLastname ] = useState<string|null>(null);
  const [ tel, setTel ] = useState<string|null>(null);
  const [ venue, setVenue ] = useState<string|null>(null);
  const [ bookDate , setBookDate ] = useState<Dayjs|null>(null);

  const dispatch = useDispatch<AppDispatch>();

  const makeReservation = () => { // เช็ค validation ในนี้
    if (nameLastname && tel && venue && bookDate) {
      const item:BookingItem = {
        nameLastname: nameLastname,
        tel: tel,
        venue: venue,
        bookDate: dayjs(bookDate).format("YYYY/MM/DD"),
      }
      dispatch(addBooking (item))
    }
  }

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNameLastname(event.target.value);
  }
  const handleTelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTel(event.target.value);
  }

  return (
    <main className="w-[100%] flex flex-col items-center">

      <div className="flex flex-col justify-center itmes-center p-4 m-4 shadow-lg w-[25%]">
      <TextField
        name="Name-Lastname"
        label="Name-Lastname"
        variant="standard"
        fullWidth
        value={nameLastname}
        className="m-2"
        onChange={handleNameChange}
      />
      <TextField
        name="Contact-Number"
        label="Contact-Number"
        variant="standard"
        fullWidth
        value={tel}
        className="m-2"
        onChange={handleTelChange}
      />

      <Select variant="standard" fullWidth sx={{ mb: 2 }} id="venue" name="venue" value={venue} onChange={(e)=> {setVenue(e.target.value)}}>
        <MenuItem value="Bloom">The Bloom Pavilion</MenuItem>
        <MenuItem value="Spark">Spark Space</MenuItem>
        <MenuItem value="GrandTable">The Grand Table</MenuItem>
      </Select>
      <DateReserve onDateChange={(value:Dayjs)=> {setBookDate(value)}} />
      <button
        name="Book Venue"
        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
        onClick={makeReservation}
      >
        Book Venue
      </button>
      </div>
    </main>
  )
}
