import ThunkStatus from 'src/store/models/ThunkStatus';
import { createSlice } from '@reduxjs/toolkit';
import {fetchBooks, fetchUserBooks} from 'src/store/books/thunks/booksThunk';
import {fetchBook, fetchUserBookId} from 'src/store/books/thunks/bookThunk';
import fetchGenres from "src/store/books/thunks/genresThunk";


const initialState = {
    booksList: [],
    userBooksList: [],
    selectedBook: null,
    userBookId: null,
    genres: [],
    status: '',
    error: ''
};

const setError = (state, action) => {
    state.status = ThunkStatus.Rejected;
    state.error = action.payload;
};

const booksSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {
        initialStateSet() {
            return {
                ...initialState
            };
        }
    },
    extraReducers: {
        [fetchBooks.pending]: state => {
            state.status = ThunkStatus.Loading;
        },
        [fetchBooks.fulfilled]: (state, action) => {
            const books = [...action.payload[0]];
            state.status = ThunkStatus.Resolved;
            state.booksList = [...state.booksList, ...books];
        },
        [fetchBooks.rejected]: setError,

        [fetchUserBooks.pending]: state => {
            state.status = ThunkStatus.Loading;
        },
        [fetchUserBooks.fulfilled]: (state, action) => {
            const userBooks = [...action.payload[0]];
            state.status = ThunkStatus.Resolved;
            state.userBooksList = [...state.userBooksList, ...userBooks];
        },
        [fetchUserBooks.rejected]: setError,

        [fetchGenres.pending]: state => {
            state.status = ThunkStatus.Loading;
        },
        [fetchGenres.fulfilled]: (state, action) => {
            const genres = [...action.payload[0]];
            state.status = ThunkStatus.Resolved;
            state.genres = [...state.genres, ...genres];
        },
        [fetchGenres.rejected]: setError,

        [fetchBook.pending]: state => {
            state.status = ThunkStatus.Loading;
        },
        [fetchBook.fulfilled]: (state, action) => {
            state.selectedBook = action.payload[0];
            state.status = ThunkStatus.Resolved;
        },
        [fetchBook.rejected]: setError,

        [fetchUserBookId.pending]: state => {
            state.status = ThunkStatus.Loading;
        },
        [fetchUserBookId.fulfilled]: (state, action) => {
            state.userBookId = action.payload[0];
            state.status = ThunkStatus.Resolved;
        },
        [fetchUserBookId.rejected]: setError,
    }
});

export default booksSlice.reducer;
