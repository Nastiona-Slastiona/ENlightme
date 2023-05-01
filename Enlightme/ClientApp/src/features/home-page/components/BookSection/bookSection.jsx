import React, { useCallback, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import urlHelper from "src/helpers/urlHelper";
import routes from "src/constants/routes";

import bookCover from 'src/static/images/cover.png';

import './bookSection.scss';

export default function BookSection({ books, genres }) {
    const genresList = [...genres];
    genresList.sort((a, b) => a.id - b.id);
    const [selectedGenre, setSelectedGenre] = useState({ id: 1, type: 'All' });

    const onGenreClick = useCallback((e) => {
        setSelectedGenre(genresList.find(g => g.type === e.target.innerText));
    }, [genres, setSelectedGenre]);

    const filtredBooks = selectedGenre.id === 1 ? books : books.filter(book => selectedGenre.id && book.genre.id === selectedGenre.id);

    const renderedBooks = useMemo(() => {
        return filtredBooks
            .map((book, index) => (
                <div className="book-section__item-container" key={index}>
                    <div className="book-section__item">
                        <div className="book-section__item-cover">
                            <div className="book-section__item-cover-image-wrapper">
                                <img className="book-section__item-cover-image" src={book.cover || bookCover} alt="cover" />       
                            </div>
                            <div className="book-section__item-button-container">
                                <Link
                                    className="book-section__item-button-link"
                                    to={urlHelper.getUrlByTemplate(routes.BOOK, { id: book.id })}
                                >
                                    <button className="book-section__item-button">More</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="book-section__item-info">
                        <div className="book-section__item-title">{book.title}</div>
                    </div>
                </div>
        ));
    }, [selectedGenre, books])

    return (
        <section className='book-section__container'>
            <div className="book-section">
                <div className="book-section__header-container">
                    <div className="book-section-genre-filter__container">
                        {
                            genresList.map((genre, index) => {
                                return (
                                    <span
                                        key={index}
                                        className={selectedGenre
                                            ? selectedGenre.id === genre.id
                                                ? "book-section-genre-filter--active"
                                                : "book-section-genre-filter"
                                            : "book-section-genre-filter"
                                        }
                                        onClick={onGenreClick}
                                    >
                                        {genre.type}
                                    </span>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="book-section__content">
                    {
                        renderedBooks.length > 0 
                            ? renderedBooks 
                            : <span className="book-section__no-content">there is no book</span>}
                </div>
            </div>
        </section>
    );
}