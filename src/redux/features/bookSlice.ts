import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BookingItem } from '../../../interface'

type BookState = {
    bookItems: BookingItem[]
}

const initialState:BookState = { bookItems:[] }

export const bookSlice = createSlice({
    name: "venue",
    initialState,
    reducers: {
        addBooking : (state, action:PayloadAction<BookingItem>)=> {
            const existingIndex = state.bookItems.findIndex(obj =>
                obj.bookDate === action.payload.bookDate &&
                obj.venue === action.payload.venue
            );
        
            if (existingIndex !== -1) {
                // ถ้าพบการจองเดิมที่ตรงกัน ให้แทนที่ข้อมูลเดิม
                state.bookItems[existingIndex] = action.payload;
            } else {
                // ถ้ายังไม่มีการจองเดิม ให้เพิ่มข้อมูลใหม่
                state.bookItems.push(action.payload);
            }
        },
        removeBooking : (state, action:PayloadAction<BookingItem>)=> {
            const remainItems = state.bookItems.filter( obj => {
                return ( (obj.bookDate !== action.payload.bookDate) ||
                (obj.nameLastname !== action.payload.nameLastname) ||
                (obj.tel!== action.payload.tel) ||
                (obj.venue !== action.payload.venue))
            })
            state.bookItems = remainItems
        }
    }
})

export const { addBooking , removeBooking  } = bookSlice.actions
export default bookSlice.reducer