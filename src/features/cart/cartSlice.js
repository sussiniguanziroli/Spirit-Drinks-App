import { createSlice } from "@reduxjs/toolkit";
import { calculateTotalPrice } from "../../utils/functions";

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        value: {
            cartItems: [],
            user: "demo",
            total: null,
            cartLenght:0,
            updatedAt: Date.now().toLocaleString() //unix timestamp
        }
    },
    reducers: {
        addItem: (state, action) => {
            const productInCart = state.value.cartItems.find(item => item.id === action.payload.id)
            if(!productInCart){
                state.value.cartItems.push(action.payload) //ac.pay es el producto
                state.value.cartLenght += 1
            } else {
                state.value.cartItems.map(item => {
                    if(item.id === action.payload.id){
                        item.cantidad += 1
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
            state.value.cartItems = state.value.cartItems.filter(item = item.id !== action.payload)
            state.value.total = calculateTotalPrice(state.value.cartItems)
            state.value.cartLenght -= 1
        },
        clearCart: (state) => {
            state.value.cartItems=[]
            state.value.total=null
            state.value.cartLenght = 0
        }
    }

})

export const {addItem, removeItem, clearCart } = cartSlice.actions

export default cartSlice.reducer