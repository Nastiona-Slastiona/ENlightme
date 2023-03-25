import booksReducer from 'src/store/books/BookReducer';
import { configureStore } from '@reduxjs/toolkit';
import usersReducer from 'src/store/users/UserReducer';


const store = configureStore({
    reducer: {
        books: booksReducer,
        users: usersReducer
    }
});

export default store;