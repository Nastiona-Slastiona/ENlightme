import React, {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import BasePage from "src/components/base/BasePage/basePage";
import BookSection from "src/features/home-page/components/BookSection/bookSection";
import PageName from 'src/features/common/components/PageName/pageName';

import requestHelper from "src/helpers/requestHelper";
import serviceUrls from "src/constants/serviceUrls";
import { fetchUserBooks } from "src/store/books/thunks/booksThunk";
import fetchGenres from "src/store/books/thunks/genresThunk";

import './userBooksPage.scss';
import AddBookModal from "../../features/book-page/components/AddBookModal/addBookModal";


function removeExtension(filename) {
  return filename.substring(0, filename.lastIndexOf('.')) || filename;
}

export default function UserBooksPage() {
    const dispatch = useDispatch()
    const [addedBook, setAddedBook] = useState()
    const userBooks = useSelector(state => state.books.userBooksList);
    const genres = useSelector(state => state.books.genres);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (userBooks.length === 0) {
            dispatch(fetchUserBooks());
        }

        if (genres.length === 0) {
            dispatch(fetchGenres());
        }
    }, [dispatch]);

    const handleSubmit = useCallback(async (e) => {
        const book = {
            title: removeExtension(e.target.files[0].name),
            description: 'description',
            author: 'author',
            genre: 2,
            language: 1,
            cover: null,
            book: e.target.files[0]
        }
        setAddedBook(book);
        setIsModalOpen(true);
        const formData = new FormData();
        for (const key in book) {
            formData.append(key, book[key]);
        };

        const response = await requestHelper.get(serviceUrls.createBook, {
            method: 'POST',
            headers: {},
            credentials: 'include',
            body: formData
        }, true, true);
    }, [dispatch, setAddedBook]);

    const onAddButtonClick = useCallback(() => {
        setIsModalOpen(true);
    }, [setIsModalOpen]);

    const onClose = useCallback(() => {
        setIsModalOpen(false);
    }, [setIsModalOpen]);

    return (
        <BasePage needAccess={true}>
            <div className="user-book-page__add-button">
                {/* <button className="user-book-page__input-book-form" onClick={onAddButtonClick}>add book</button> */}
                <form className="user-book-page__input-book-label" method="POST" encType="multipart/form-data" onSubmit={handleSubmit}>
                    <input type='file' accept='.epub' className="user-book-page__input-book" onChange={handleSubmit} />
                </form>
                {/* <label className="user-book-page__input-book-label" method="POST" encType="multipart/form-data" onSubmit={handleSubmit}>
                    <input type='file' accept=".epub"  className="user-book-page__input-book" onChange={onAddButtonClick} />
                </label> */}
            </div>
            { isModalOpen && addedBook && <AddBookModal isModalOpen={isModalOpen} onClose={onClose} book={addedBook} /> }    
            <PageName title={'My books'} />
            <BookSection books={userBooks} genres={genres} />
        </BasePage>
    )
}