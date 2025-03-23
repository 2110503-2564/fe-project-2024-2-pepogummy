"use client"
import { removeBooking  } from "@/redux/features/bookSlice"
import { useAppSelector, AppDispatch } from "@/redux/store"
import { useDispatch, UseDispatch } from "react-redux"

export default function BookingList(){
    const bookItems = useAppSelector((state)=> state.bookSlice.bookItems)
    const dispatch = useDispatch<AppDispatch>()
    return (
        <>
        {
            bookItems.length == 0 ? <div className="text-xl text-center">No Venue Booking</div> :
            bookItems.map((BookingItem)=> (
                <div className="bg-slate-200 rounded px-5 mx-5 py-2 my-2" /* key */>
                    <div className="text-xl">{BookingItem.nameLastname}</div>
                    <div className="text-sm">Tel: {BookingItem.tel}</div>
                    <div className="text-sm">{BookingItem.bookDate}</div>
                    <div className="text-xl">Venue: {BookingItem.venue}</div>
                    <button className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded"
                    onClick={() => dispatch(removeBooking (BookingItem))}>ยกเลิกการจองสถานที่จัดเลี้ยง</button>
                </div>
            ))
        }
        </>
    )
}