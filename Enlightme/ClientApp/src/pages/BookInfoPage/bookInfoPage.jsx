import React, { useState, useEffect, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import BasePage from "src/components/base/BasePage/basePage";
import PageName from "features/common/components/PageName/pageName";
import urlHelper from "src/helpers/urlHelper";
import serviceUrls from "src/constants/serviceUrls";
import requestHelper from "src/helpers/requestHelper";
import routes from "src/constants/routes";

import bookCover from 'src/static/images/cover.png';

import './bookInfoPage.scss';


export default function BookInfoPage() {
    const dispatch = useDispatch();
    const location = useLocation();
    const bookId = +location.pathname.slice(6);
    const [book, setBook] = useState();
    const isAuth = useSelector(state => state.users.isAuth);

    useEffect(() => {
        if (bookId) {
            dispatch(async () => {
                const url = urlHelper.getUrlByTemplate(
                    serviceUrls.getUserBookId, {id: bookId}
                );

                const data = await requestHelper.get(
                    url, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    }, isAuth
                );

                if (data) {
                    setBook(data);
                };
            })
        }
    }, [bookId, dispatch, isAuth, setBook]);

    const formHandler = useCallback(async (e) => {
        e.preventDefault();

        if (!isAuth) {
            window.location.replace(routes.LOG_IN);
        }
 
        const data = await requestHelper.get(
            url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
            }, isAuth
        );

        if (data.url) {
            window.location.replace(data.url)
        }
    }, [isAuth]);

    const onDeleteButtonClick = useCallback(async () => {
        const url = urlHelper.getUrlByTemplate(
            serviceUrls.deleteBook, { bookId }
        );

        const data = await requestHelper.get(
            url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            }, isAuth, true
        );

        if (data) {
            window.location.replace(routes.USER_BOOKS);
        }
    }, [bookId]);

    if (!book) {
        return <div></div>;
    }

    return (
        <BasePage>
            {
                book && (<>
                    <PageName title={book.title} />
                    <div className="book-info-page__author-container">
                        <h2 className="book-info-page__author">{
                            book.author
                        }</h2>
                    </div>
                    <section className="book-info-page__book-section">
                        <div className="book-info-page__book-visual-info">
                            <div className="book-info-page__book-cover-container">
                                <img className="book-info-page__book-cover" src={book.cover ?? bookCover} alt='cover' />
                            </div>
                            {
                                book.id && (
                                    <div className="book-info-page__price-info">
                                        <Link className="book-info-page__link" to={urlHelper.getUrlByTemplate(routes.USER_BOOK_CARDS, { id: book.id })}>
                                            <button className="book-info-page__button">cards</button>
                                        </Link>
                                        <button className="book-info-page__button" onClick={onDeleteButtonClick}>delete the book</button>
                                    </div>
                                )
                            }
                            <div></div>
                        </div>
                        <div className="book-info-page__book-text-info">
                            <div className="book-info-page__book-main-info-container">
                                {
                                    book.genre && 
                                        <span className="book-info-page__book-main-info">
                                            Genre: {book.genre.type}<br />
                                        </span>
                                }
                                {
                                    book.language && 
                                        <span className="book-info-page__book-main-info">
                                            Language: {book.language.languageName}<br />
                                        </span>
                                }
                                {
                                    book.publicationDate && 
                                        <span className="book-info-page__book-main-info">
                                            Publication date: {book.publication_date}
                                        </span>
                                }
                            </div>
                            <div className="book-info-page__book-description-container">
                                <span className="book-info-page__book-description">{book.description ? book.description : 'There is no description.'}</span>
                            </div>
                        </div>
                    </section>
                    {
                        book.id && (
                            <div className="book-info-page__read-button">
                                <Link className="book-info-page__read-button" to={urlHelper.getUrlByTemplate(routes.READ_BOOK, { id: book.id })}>
                                    <button className="book-info-page__button">read</button>
                                </Link>
                            </div>
                        )
                    }
                </>)
            }
        </BasePage>
    )
}