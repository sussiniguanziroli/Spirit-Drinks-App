import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        value: {
            email: null,
            token: null,
        }
    },
    reducers: {
        setUser: (state, action) => {
            state.value.email = action.payload.email,
            state.value.token = action.payload.idToken
        },
        clearUser: (state) => {
            state.value.email = null,
            state.value.email = null
        }
    }
})


export const {setUser, clearUser } = authSlice.actions

export default authSlice.reducer
