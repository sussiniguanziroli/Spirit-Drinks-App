import { createSlice } from "@reduxjs/toolkit";
import categories from '../../data/categories.json';
import products from '../../data/products.json';

export const shopSlice = createSlice({
    name: 'shop',
    initialState: {
        value: {
            categories : categories,
            products: products,
            categorySelected: "",
            filteredProductsByCategory: []
        }
    },
    reducers: {
        setCategory: (state, action) => {
            state.value.filteredProductsByCategory = products.filter(product => product.category.id.toLowerCase() === action.payload.toLowerCase())
            state.categorySelected = action.payload
        }
    }
})

export const {setCategory} = shopSlice.actions;

export default shopSlice.reducer
