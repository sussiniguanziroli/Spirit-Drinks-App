import { configureStore } from "@reduxjs/toolkit";
import shopReducer from "../features/shop/shopSlice";
import cartReducer from "../features/cart/cartSlice";
import { receiptsApi } from "../services/receiptsService";
import { shopApi } from "../services/shopService";

export const store = configureStore({
    reducer: {
        shopReducer,
        cartReducer,
        [shopApi.reducerPath]: shopApi.reducer,
        [receiptsApi.reducerPath]: receiptsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(shopApi.middleware).concat(receiptsApi.middleware)
})