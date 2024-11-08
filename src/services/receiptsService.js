import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {base_url} from '../firebase/config'

export const receiptsApi = createApi({
    reducerPath: "receiptsApi",
    baseQuery: fetchBaseQuery({baseUrl: base_url}),
    endpoints: (builder) => ({
        postReceipt: builder.mutation({
            query: ({...receipt}) => ({
                url: 'receipts.json',
                method: 'POST',
                data: {receipt}
            })
        })
    })
})

export const { usePostReceiptMutation } = receiptsApi