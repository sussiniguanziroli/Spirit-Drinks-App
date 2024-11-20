import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {base_url} from '../firebase/config'

export const receiptsApi = createApi({
    reducerPath: "receiptsApi",
    baseQuery: fetchBaseQuery({ baseUrl: base_url }),
    endpoints: (builder) => ({
        postReceipt: builder.mutation({
            query: ({ localId, receipt }) => ({
                url: `profilesData/${localId}/orders.json`,
                method: 'POST',
                body: receipt,
            }),
        }),
        postReceiptOut: builder.mutation({
            query: ({localId, receipt}) => ({
                url: `receipts/${localId}.json`,
                method: 'POST',
                body: receipt
            })
        }),
        getReceipts: builder.query({
            query: (localId) => ({
                url: `profilesData/${localId}/orders.json`,
                method: 'GET',
            }),
        }),
    }),
});

export const { usePostReceiptMutation, usePostReceiptOutMutation, useGetReceiptsQuery } = receiptsApi;
