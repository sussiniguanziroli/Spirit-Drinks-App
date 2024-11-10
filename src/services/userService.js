import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {base_url} from '../firebase/config'

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({baseUrl: base_url}),
    endpoints: (builder) => ({
        putProfilePicture: builder.mutation({
            query: ({image, localId}) => ({
                url: `profilePictures/${localId}.json`,
                method: 'PUT', //reemplaza lo que existe si tiene el mismo id y si no sube otro
                body: {
                    image: image
                }
            })
        }),
        getProfilePicture:  builder.query({
            query: (localId) => `profilePictures/${localId}.json`
        })
    }),
   
})

export const { usePutProfilePictureMutation, useGetProfilePictureQuery } = userApi;