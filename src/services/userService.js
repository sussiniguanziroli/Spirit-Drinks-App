import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { base_url } from '../firebase/config'

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({ baseUrl: base_url }),
    endpoints: (builder) => ({
        putProfilePicture: builder.mutation({
            query: ({ profilePicture, localId }) => ({
                url: `profilePictures/${localId}.json`,
                method: "PUT",
                body: {
                    profilePicture: profilePicture
                }
            }),
        }),
        getProfilePicture: builder.query({
            query: (localId) => `profilePictures/${localId}.json`
        })
    }),
});

export const { usePutProfilePictureMutation, useGetProfilePictureQuery } = userApi;