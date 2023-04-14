import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import Carousel from "src/components/base/Carousel/carousel";
import requestHelper from "src/helpers/requestHelper";
import serviceUrls from "src/constants/serviceUrls";

import "./bookAdviseSection.scss";

const BookAdviseItem = ({ book, index }) => {
    return (
        <section className="book-advise-section__container" id={book.id} key={index}>
            <div className="book-advise-section">
                <div className="book-advise-info">
                    <div className="book-advise-info__title">{book.title}</div>
                    <div className="book-advise-info__description">{book.description}</div>
                    <div className="book-advise-button__container">
                        <Link to={`book/${book.id}`}>
                            <button className="book-advise-button">Read more...</button>
                        </Link>
                    </div>
                </div>
                <div><img className="book-advise-info__cover" src={book.cover} /></div>
            </div>
        </section>
    );
}

export default function BookAdviseSection() {
    const dispatch = useDispatch();
    const [books, setBooks] = useState([]);

    useEffect(() => {
        dispatch(async () => {
            const response = await requestHelper.get(serviceUrls.getRecommendedBooks);
            setBooks(response)
        })
    }, [dispatch])


    const bookItems = books.map((book, ind) => <BookAdviseItem book={book} index={ind} />);

    return (
        <div>hi</div>
    );
}