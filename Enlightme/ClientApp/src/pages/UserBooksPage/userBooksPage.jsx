import React, {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import BasePage from "src/components/base/BasePage/basePage";
import BookSection from "src/features/home-page/components/BookSection/bookSection";
import PageName from 'src/features/common/components/PageName/pageName';
import AddBookModal from "src/features/book-page/components/AddBookModal/addBookModal";

import requestHelper from "src/helpers/requestHelper";
import serviceUrls from "src/constants/serviceUrls";
import { fetchUserBooks } from "src/store/books/thunks/booksThunk";
import fetchCommonInfo from "src/store/books/thunks/commonInfoThunk";

import './userBooksPage.scss';


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
            dispatch(fetchCommonInfo());
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
    }, [dispatch, setAddedBook]);

    const onAddButtonClick = useCallback(async (newBook) => {
        setIsModalOpen(false);
        
        const formData = new FormData();
        for (const key in newBook) {
            formData.append(key, newBook[key]);
        };

        await requestHelper.get(serviceUrls.createBook, {
            method: 'POST',
            headers: {},
            credentials: 'include',
            body: formData
        }, true, true);

        dispatch(fetchUserBooks());
    }, [setIsModalOpen, fetchUserBooks, dispatch]);

    const onClose = useCallback(() => {
        setIsModalOpen(false);
        setAddedBook(null);
    }, [setIsModalOpen]);

    return (
        <BasePage needAccess={true}>
            <div className="user-book-page__add-button">
                <form className="user-book-page__input-book-label" method="POST" encType="multipart/form-data" onSubmit={handleSubmit}>
                    <input type='file' accept='.epub' className="user-book-page__input-book" onChange={handleSubmit} />
                </form>
            </div>
            { 
                isModalOpen && addedBook && 
                <AddBookModal 
                    isModalOpen={isModalOpen}
                    onSaveClick={onAddButtonClick}
                    onClose={onClose} 
                    book={addedBook}
                /> 
            }    
            <PageName title={'My books'} />
            <BookSection books={userBooks} genres={genres} />
        </BasePage>
    )
}