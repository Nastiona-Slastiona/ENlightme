import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import BasePage from "src/components/base/BasePage/basePage";
import BookSection from "src/features/home-page/components/BookSection/bookSection";
import PageName from "features/common/components/PageName/pageName";
import PagesMenu from "features/common/components/PagesMenu/pagesMenu";

import { fetchBooks } from "src/store/books/thunks/booksThunk";
import fetchGenres from "src/store/books/thunks/genresThunk";

import './libraryPage.scss';

export default function LibraryPage() {
    const dispatch = useDispatch()
    const books = useSelector(state => state.books.booksList);
    const genres = useSelector(state => state.books.genres);

    useEffect(() => {
        if (books.length === 0) {
            dispatch(fetchBooks());
        }

        if (!genres) {
            dispatch(fetchGenres());
        }
    }, [dispatch]);

    return (
        <BasePage>
            <PageName title={'Library'} />
            <BookSection books={books} genres={genres} />
        </BasePage>
    )
}