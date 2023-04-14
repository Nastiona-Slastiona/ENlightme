import React, {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import BasePage from "src/components/base/BasePage/basePage";
import BookSection from "src/features/home-page/components/BookSection/bookSection";
import PageName from 'src/features/common/components/PageName/pageName';
import Logo from "src/features/common/components/Logo/logo";

import requestHelper from "src/helpers/requestHelper";
import serviceUrls from "src/constants/serviceUrls";
import { fetchUserBooks } from "src/store/books/thunks/booksThunk";
import fetchGenres from "src/store/books/thunks/genresThunk";

import './userBooksPage.scss';

export default function UserBooksPage() {
    const dispatch = useDispatch()
    const userBooks = useSelector(state => state.books.userBooksList);
    const genres = useSelector(state => state.books.genres);
    const isAuth = useSelector(state => state.users.isAuth);

    useEffect(() => {
        if (userBooks.length === 0) {
            dispatch(fetchUserBooks());
        }

        if (genres.length === 0) {
            dispatch(fetchGenres());
        }
    }, [dispatch]);

    const handleSubmit = useCallback(async (e) => {
        const formData = new FormData();
        formData.append("title", e.target.files[0].name);
        formData.append("url", e.target.files[0], e.target.files[0].name);

        const response = await requestHelper.get(serviceUrls.createBook, {
            method: 'POST',
            headers: {
            },
            body: formData
        }, true);

        if (response) {
            window.location.reload();
        }
    }, [dispatch]);

    return (
        <BasePage needAccess={true}>
            <div className="user-book-page-logo__container">
                <form className="user-book-page__input-book-form" method="POST" encType="multipart/form-data" onSubmit={handleSubmit}>
                    <input type='file' accept='.epub' className="user-book-page__input-book" onChange={handleSubmit} />
                </form>
            </div>
            <PageName title={'My books'} />
            <BookSection books={userBooks} genres={genres} />
        </BasePage>
    )
}