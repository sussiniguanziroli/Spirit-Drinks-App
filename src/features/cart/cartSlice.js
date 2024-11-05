import { createSlice } from "@reduxjs/toolkit";


export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        value: {
            cartItems: [],
            user: 'demo',

        },
        reducers: {

        }
    }
})

export const {} = cartSlice.actions

export default cartSlice.reducer