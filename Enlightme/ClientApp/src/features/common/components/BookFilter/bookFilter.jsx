import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchUserBooks } from "src/store/books/thunks/booksThunk";

import './bookFilter.scss';

export default function BookFilter({ onItemSelect, initialValue = 0 }) {
    const dispatch = useDispatch()
    const books = useSelector(state => state.books.userBooksList);

    useEffect(() => {
        if (books.length === 0) {
            dispatch(fetchUserBooks());
        }
    }, [dispatch]);

    const bookList = [{ id: 0, title: 'all books' }, ...books];

    const onSelected = useCallback((e) => {
        onItemSelect(e.target.value);
    }, [onItemSelect]);

    const booksSelector = bookList.map((val, ind) => {
        return (
            <option value={val.id} key={ind} id={val.id}>{val.title}</option>
        )
    });

    return (
        <div className='filter-field'>
            <select id='books' className='filter' value={initialValue} onChange={onSelected}>
                {booksSelector}
            </select>
        </div>
    );
}