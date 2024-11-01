import { createSlice } from "@reduxjs/toolkit";
//import categories from '../../data/categories.json'; viene directamente del service
import products from '../../data/products.json';

export const shopSlice = createSlice({
    name: 'shop',
    initialState: {
        value: {
            //categories : categories, viene directamente del service
            products: products,
            categorySelected: "",
            filteredProductsByCategory: [],
            productIdSelected: null
        }
    },
    reducers: {
        setCategory: (state, action) => {
            state.value.filteredProductsByCategory = products.filter(product => product.category.id.toLowerCase() === action.payload.toLowerCase())
            state.value.categorySelected = action.payload.toLowerCase()
        },
        setProductId: (state, action) => {
            state.value.productIdSelected = products.find(product=>product.id === action.payload)
        }
    }
})

export const {setCategory} = shopSlice.actions;
export const {setProductId} = shopSlice.actions;

export default shopSlice.reducer
