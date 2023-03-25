import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from 'react';

import ThunkStatus from "src/store/models/ThunkStatus";

import BasePage from "src/components/base/BasePage/basePage";
import CallToActionSection from "src/features/home-page/components/CallToActionSection/callToActionSection";
import IntroSection from "src/features/home-page/components/IntroSection/introSection";
import BookSection from "src/features/home-page/components/BookSection/bookSection";
import PageName from "features/common/components/PageName/pageName";

import { fetchBooks } from "src/store/books/thunks/booksThunk";
import fetchGenres from "src/store/books/thunks/genresThunk";

import './home.scss'

const Home = () => {
    const dispatch = useDispatch()
    const books = useSelector(state => state.books.booksList);
    const genres = useSelector(state => state.books.genres);

    useEffect(() => {
        if (books.length === 0) {
            dispatch(fetchBooks());
        }

        if (genres.length === 0) {
            dispatch(fetchGenres());
        }
    }, [dispatch]);

    return (
        <BasePage>
            <IntroSection />
            <CallToActionSection />
            <PageName title={'Popular Books'} />
            <BookSection sectionTitle="Popular Books" books={books} genres={genres} />
        </BasePage>
    );
}

export default Home;