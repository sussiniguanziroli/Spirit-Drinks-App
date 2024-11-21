import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { base_url } from '../firebase/config'

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({ baseUrl: base_url }),
    endpoints: (builder) => ({
        putProfileData: builder.mutation({
            query: ({ profilePicture, data, localId }) => ({
                url: `profilesData/${localId}.json`,
                method: "PUT",
                body: {
                    data: data,
                    profilePicture: profilePicture
                }
            }),
        }),
        getProfilePicture: builder.query({
            query: (localId) => `profilesData/${localId}.json`
        }),
        addDireccion: builder.mutation({
            query: ({ localId, direccion }) => ({
                url: `profilesData/${localId}/misDirecciones.json`,
                method: "POST",
                body: direccion,
            }),
        }),
        getDireccions: builder.query({
            query: (localId) => `profilesData/${localId}/misDirecciones.json`,
        }),    
    }),
});

export const { usePutProfileDataMutation, useGetProfilePictureQuery, useGetDireccionsQuery, useAddDireccionMutation } = userApi;