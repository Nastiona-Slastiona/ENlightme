import { createAsyncThunk } from '@reduxjs/toolkit';
import requestHelper from 'src/helpers/requestHelper';
import serviceUrls from 'src/constants/serviceUrls';
import urlHelper from 'src/helpers/urlHelper';

const fetchBook = createAsyncThunk(
    'books/fetchBook',
    async ({id, isAuth = false}, { rejectWithValue }) => {
        try {
            const url = urlHelper.getUrlByTemplate(
                serviceUrls.getBookById,
                { id }
            );
            const data = await requestHelper.get(
                url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            }, isAuth);

            return [data, id];
        } catch (error) {
            console.log(error.message)
            return rejectWithValue(error.message);
        }
    }
);


const fetchUserBookId = createAsyncThunk(
    'books/fetchUserBookId',
    async ({ id, isAuth = false }, { rejectWithValue }) => {
        console.log(id, isAuth)
        try {
            const url = urlHelper.getUrlByTemplate(
                serviceUrls.getUserBookId,
                { id }
            );
            const data = await requestHelper.get(
                url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            }, isAuth);

            return [data, id];
        } catch (error) {
            console.log(error.message)
            return rejectWithValue(error.message);
        }
    }
);

export { fetchBook, fetchUserBookId };
