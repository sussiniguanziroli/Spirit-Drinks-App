import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {base_url} from '../firebase/config'

export const shopApi = createApi({
    reducerPath: "shopApi",
    baseQuery: fetchBaseQuery({baseUrl: base_url}),
    endpoints: (builder) => ({
        getCategories: builder.query({
            query: ()=> 'categories.json'
        }),
        getProducts: builder.query({
            query: ()=> 'products.json'
        }),
        getProductsByCategory: builder.query({
            query: (category)=> {
                categoryString = category.toLowerCase()
                return(
                    `products.json?orderBy="categoryString"&equalTo="${category}"`
                )
            },
            transformResponse: (response) => (
                response ? Object.values(response): [])
        }),
        getProduct: builder.query({
            query: (productIdSelected) => `products.json?orderBy="id"&equalTo=${productIdSelected}`,
            transformResponse: (response) => response ? Object.values(response)[0]: []
        }),
    }),
   
})

export const {useGetCategoriesQuery, useGetProductsQuery, useGetProductsByCategoryQuery, useGetProductQuery} = shopApi;