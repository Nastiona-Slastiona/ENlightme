import { createAsyncThunk } from '@reduxjs/toolkit';
import requestHelper from 'src/helpers/requestHelper';
import serviceUrls from 'src/constants/serviceUrls';
import urlHelper from 'src/helpers/urlHelper';


const fetchGenres = createAsyncThunk(
    'books/fetchGenres',
    async (input, { rejectWithValue }) => {
        try {
            const url = urlHelper.getUrlByTemplate(
                serviceUrls.getGenres,
            );
            const data = await requestHelper.get(url);
            return [data, input];
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export default fetchGenres;