import { createSlice } from "@reduxjs/toolkit";
import { calculateTotalPrice } from "../../utils/functions";

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        value: {
            cartItems: [],
            user: "demo",
            total: null,
            updatedAt: Date.now().toLocaleString() //unix timestamp
        }
    },
    reducers: {
        addItem: (state, action) => {
            const productInCart = state.value.cartItems.find(item => item.id === action.payload.id)
            if(!productInCart){
                state.value.cartItems.push(action.payload) //ac.pay es el producto
            } else {
                state.value.cartItems.map(item => {
                    if(item.id === action.payload.id){
                        item.quantity += 1
                        return item
                    }
                    return item
                })
            }

            const total = calculateTotalPrice(state.value.cartItems)

            state.value = {
                ...state.value,
                total,
                updatedAt: new Date().toLocaleString()
            }
        },
        removeItem: (state, action) => {
            return null
        },
        clearCart: (state) => {
            return null
        }
    }

})

export const {addItem, removeItem, clearCart } = cartSlice.actions

export default cartSlice.reducer