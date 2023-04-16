import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    isAuth: false,
    username: '',
    status: '',
    userImage: '',
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
                userImage: action.payload.userImage
            };
        }
    },
});

export default usersSlice.reducer;
