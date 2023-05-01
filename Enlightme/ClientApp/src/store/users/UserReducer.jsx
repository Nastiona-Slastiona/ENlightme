import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    isAuth: false,
    username: '',
    status: '',
    notifications: undefined,
    cards: [],
    notes: [],
    books: []
};


const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUserData(state, action) {
            return {
                ...state,
                isAuth: action.payload.isAuth,
                username: action.payload.username
            };
        },
        setUserNotifications(state, action) {
            return {
                ...state,
                notifications: action.payload.notifications
            };
        }
    },
});

export default usersSlice.reducer;
