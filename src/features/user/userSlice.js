import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    name: '',
    location: '',
    birthdate: '',
    favoriteDrink: '',
    experienceLevel: 'novato',
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setProfileData: (state, action) => {
            return { ...state, ...action.payload };
        },
        clearProfileData: (state) => {
            return initialState;
        },
    }
})


export const { setProfileData, clearProfileData } = userSlice.actions

export default userSlice.reducer
