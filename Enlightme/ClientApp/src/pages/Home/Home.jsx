import React, { useEffect, useState, useCallback } from "react";
import {useDispatch, useSelector} from "react-redux";
import { Link } from "react-router-dom";

import urlHelper from "src/helpers/urlHelper";
import routes from "src/constants/routes";
import serviceUrls from "src/constants/serviceUrls";
import requestHelper from "src/helpers/requestHelper";

import BasePage from "src/components/base/BasePage/basePage";

import { fetchUserBooks } from "src/store/books/thunks/booksThunk";
import bookCover from 'src/static/images/cover.png';
import upload from "src/static/images/upload";

import './home.scss'

const defaultCard = { value: 'Success', translation: 'Успех'};

const Home = () => {
    const dispatch = useDispatch()
    const userBooks = useSelector(state => state.books.userBooksList);
    const [card, setCard] = useState(defaultCard);
    const [book, setBook] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [addedBook, setAddedBook] = useState();

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

    useEffect(() => {
        if (userBooks && userBooks.length === 0) {
            dispatch(fetchUserBooks());
        } else if (userBooks) {
            setBook(userBooks[0]);
        }
    }, [dispatch, userBooks]);

    useEffect(() => {
        ( 
            async () => {
                if (card.value === defaultCard.value) {
                    const data = await requestHelper.get(
                        serviceUrls.getCards, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        credentials: 'include'
                    }, true, true);
                    
                    setCard(data[0]);
                }
            }
        )();
    }, [card]);

    return (
        <BasePage>
            <div className="home-page__container">
                <section className="home-page__section">
                    <header className="home-page__header">Read book</header>
                    { book && (
                        <div className="home-page__book-section">
                            <div className="home-page__book-cover-wrapper">
                                <img className="home-page__book-cover" src={book.cover || bookCover} />
                            </div>
                            <div>
                                <header className="home-page__book-header">{book.title}</header>
                                <span className="home-page__book-quote">"The reading of all good books is like conversation with the finest men of past centuries."</span>
                                <div className="home-page__button-container">
                                    <Link
                                        className="home-page__button-link"
                                        to={urlHelper.getUrlByTemplate(routes.READ_BOOK, { id: book.id })}
                                    >
                                        <button className="home-page__button">Read</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )}
                    {
                        !book && (
                            <div>
                                <label htmlFor="inputFile" className="book-section__uploader">
                                    Upload your book
                                    <input
                                        id="inputFile"
                                        type="file"
                                        accept="video/*"
                                        className="upload-input" />
                                    <img src={upload} accept='.epub' className="upload-image" onChange={handleSubmit} />
                                </label>
                                <div className="upload-section__info">
                                    Here you can upload your book and create new cards
                                </div>
                            </div>
                        )
                    }
                </section>
                <section className="home-page__section">
                    <header className="home-page__header">Repeat cards</header>
                    <div className="home-page__card-wrapper">
                        <div className="home-page__card">
                            <div className="home-page__card-value">
                                {card.value}
                            </div>
                            <div className="home-page__card-translation">
                                {card.translation}
                            </div>
                        </div>
                        <div className="home-page__button-container">
                            <Link
                                className="home-page__button-link"
                                to={urlHelper.getUrlByTemplate(routes.USER_CARDS)}
                            >
                                <button className="home-page__button">Repeat</button>
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </BasePage>
    );
}

export default Home;