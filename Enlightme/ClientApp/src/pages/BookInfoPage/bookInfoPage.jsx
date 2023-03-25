import React, { useState, useEffect, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import BasePage from "src/components/base/BasePage/basePage";
import PageName from "features/common/components/PageName/pageName";
import urlHelper from "src/helpers/urlHelper";
import serviceUrls from "src/constants/serviceUrls";
import requestHelper from "src/helpers/requestHelper";
import routes from "src/constants/routes";
import { fetchUserBookId } from "src/store/books/thunks/bookThunk";

import bookCover from 'src/static/images/book-closed.jpg';

import './bookInfoPage.scss';


export default function BookInfoPage() {
    const dispatch = useDispatch();
    const location = useLocation();
    const bookId = +location.pathname.slice(6);
    const [book, setBook] = useState();
    const userBookId = useSelector(state => state.books.userBookId);
    const isAuth = useSelector(state => state.users.isAuth);

    useEffect(() => {
        if (bookId) {
            dispatch(fetchUserBookId({id: bookId, isAuth}));
            dispatch(async () => {
                const url = urlHelper.getUrlByTemplate(
                    serviceUrls.getBookInfo, {id: bookId}
                );
                const data = await requestHelper.get(
                    url, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    }, isAuth
                );
                setBook(data);
            })
        }
    }, [bookId, dispatch, isAuth]);

    const formHandler = useCallback(async (e) => {
        e.preventDefault();

        if (!isAuth) {
            window.location.replace(routes.LOG_IN);
        }
        
        const url = urlHelper.getUrlByTemplate(serviceUrls.paymentCheckout, { id: bookId });
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

    if (!book) {
        return <div></div>;
    }

    return (
        <BasePage>
            {
                book && userBookId && (<>
                    <PageName title={book.title} />
                    <div className="book-info-page__author-container">
                        <h2 className="book-info-page__author">{
                            book.authors && (book.authors.map((a, i) => {
                                return `${a.first_name} ${a.last_name}`
                            }).join(', '))
                        }</h2>
                    </div>
                    <section className="book-info-page__book-section">
                        <div className="book-info-page__book-visual-info">
                            <div className="book-info-page__book-cover-container">
                                <img className="book-info-page__book-cover" src={book.cover ?? bookCover} alt='cover' />
                            </div>
                            {
                                !userBookId.id && (
                                    <div className="book-info-page__price-info">
                                        <span className="book-info-page__price">{book.price} $</span>
                                        <form onSubmit={formHandler} method='POST' >
                                            <button className="book-info-page__button" type='submit'>
                                                buy
                                            </button>
                                        </form>
                                    </div>
                                )
                            }
                            {
                                userBookId.id && (
                                    <div className="book-info-page__price-info">
                                        <Link className="book-info-page__link" to={urlHelper.getUrlByTemplate(routes.USER_BOOK_NOTES, { id: userBookId.id })}>
                                            <button className="book-info-page__button">notes</button>
                                        </Link>
                                        <Link className="book-info-page__link" to={urlHelper.getUrlByTemplate(routes.USER_BOOK_CARDS, { id: userBookId.id })}>
                                            <button className="book-info-page__button">cards</button>
                                        </Link>
                                    </div>
                                )
                            }
                            <div></div>
                        </div>
                        <div className="book-info-page__book-text-info">
                            {
                                (book.genres || book.publication_date || book.language) && (
                                    <div className="book-info-page__book-main-info-container">
                                        <span className="book-info-page__book-main-info">
                                            genres: {book.genres}<br />
                                            publication date: {book.publication_date}<br />
                                            language: {book.language}<br />
                                        </span>
                                    </div>
                                )
                            }
                            <div className="book-info-page__book-description-container">
                                <span className="book-info-page__book-description">{book.description ? book.description : 'There is no description.'}</span>
                            </div>
                        </div>
                    </section>
                    {
                        userBookId.id && (
                            <div className="book-info-page__read-button">
                                <Link className="book-info-page__read-button" to={urlHelper.getUrlByTemplate(routes.READ_BOOK, { id: bookId })}>
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