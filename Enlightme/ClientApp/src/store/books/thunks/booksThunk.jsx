import { createAsyncThunk } from '@reduxjs/toolkit';
import requestHelper from 'src/helpers/requestHelper';
import serviceUrls from 'src/constants/serviceUrls';
import urlHelper from 'src/helpers/urlHelper';


 const fetchBooks = createAsyncThunk(
    'books/FetchBooks',
    async (input, { rejectWithValue }) => {
        try {
            const url = urlHelper.getUrlByTemplate(
                serviceUrls.getBooks,
            );
            const data = await requestHelper.get(url);

            return [data, input];
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

 const fetchUserBooks = createAsyncThunk(
    'books/FetchUserBooks',
    async (input, { rejectWithValue }) => {
        try {
            const url = urlHelper.getUrlByTemplate(
                serviceUrls.getUserBooks,
            );
            const data = await requestHelper.get(
                url, {method: 'GET', headers: {}}, true
            );

            return [data, input];
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export { fetchBooks, fetchUserBooks };