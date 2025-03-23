"use client"
import { removeBooking } from "@/redux/features/bookSlice"
import { useAppSelector, AppDispatch } from "@/redux/store"
import { useDispatch } from "react-redux"

export default function BookingList() {
    const bookItems = useAppSelector((state) => state.bookSlice.bookItems)
    const dispatch = useDispatch<AppDispatch>()

    return (
        <div className="p-12 max-w-4xl mx-auto border border-black-500 shadow-xl mt-4 rounded-3xl mb-8">
            {bookItems.length === 0 ? (
                <div className="text-xl text-center text-gray-600">
                    No Venue Booking
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300">
                        <thead className="bg-gray-100">
                            <tr className="text-gray-700">
                                <th className="border border-gray-300 p-3">ชื่อผู้จอง</th>
                                <th className="border border-gray-300 p-3">อีเมลผู้จอง</th>
                                <th className="border border-gray-300 p-3">วันที่จอง</th>
                                <th className="border border-gray-300 p-3">Campground</th>
                                <th className="border border-gray-300 p-3">เบอร์โทร</th>
                                <th className="border border-gray-300 p-3">จัดการ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookItems.map((booking) => (
                                <tr className="text-center bg-white hover:bg-gray-50">
                                    <td className="border border-gray-300 p-3">{booking.nameLastname}</td>
                                    <td className="border border-gray-300 p-3">{booking.nameLastname}</td>
                                    <td className="border border-gray-300 p-3">{booking.bookDate}</td>
                                    <td className="border border-gray-300 p-3">{booking.venue}</td>
                                    <td className="border border-gray-300 p-3">{booking.tel}</td>
                                    <td className="border border-gray-300 p-3">
                                        <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mr-2"
                                        onClick={() => dispatch(removeBooking(booking))}>  
                                            แก้ไข
                                        </button>
                                        <button className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded"
                                        onClick={() => dispatch(removeBooking(booking))}>  
                                            ลบ
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}
