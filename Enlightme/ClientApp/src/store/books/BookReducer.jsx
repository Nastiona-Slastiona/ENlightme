import ThunkStatus from 'src/store/models/ThunkStatus';
import { createSlice } from '@reduxjs/toolkit';
import {fetchBooks, fetchUserBooks} from 'src/store/books/thunks/booksThunk';
import {fetchBook, fetchUserBookId} from 'src/store/books/thunks/bookThunk';
import fetchCommonInfo from "src/store/books/thunks/commonInfoThunk";


const initialState = {
    booksList: [],
    userBooksList: [],
    selectedBook: null,
    userBookId: null,
    genres: [],
    languages: [],
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

        [fetchCommonInfo.pending]: state => {
            state.status = ThunkStatus.Loading;
        },
        [fetchCommonInfo.fulfilled]: (state, action) => {
            const commonInfo = action.payload[0];
            state.status = ThunkStatus.Resolved;
            state.genres = [...state.genres, ...commonInfo.genres];
            state.languages = [...state.languages, ...commonInfo.languages];
        },
        [fetchCommonInfo.rejected]: setError,

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
