import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    isAuth: false,
    username: '',
    status: '',
    cards: [],
    notes: [],
    books: [],
};


const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUserData(state, action) {
            return {
                ...state,
                isAuth: action.payload.isAuth,
                username: action.payload.username,
            };
        }
    },
});

export default usersSlice.reducer;
