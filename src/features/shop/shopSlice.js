import { createSlice } from "@reduxjs/toolkit";

export const shopSlice = createSlice({
    name: 'shop',
    initialState: {
        value: {
            categorySelected: "",
            productIdSelected: null
        }
    },
    reducers: {
        setCategory: (state, action) => {
            state.value.categorySelected = action.payload.toLowerCase()
        },
        setProductId: (state, action) => {
            state.value.productIdSelected = action.payload
        }
    }
})

export const {setCategory} = shopSlice.actions;
export const {setProductId} = shopSlice.actions;

export default shopSlice.reducer
