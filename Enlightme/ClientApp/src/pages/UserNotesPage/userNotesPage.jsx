import React, { useEffect, useState, useCallback } from "react";

import BasePage from "src/components/base/BasePage/basePage";
import PageName from 'src/features/common/components/PageName/pageName';
import BookFilter from "src/features/common/components/BookFilter/bookFilter";

import './userNotesPage.scss';
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import urlHelper from "src/helpers/urlHelper";
import serviceUrls from "src/constants/serviceUrls";
import requestHelper from "src/helpers/requestHelper";


function isNumber(char) {
    if (typeof char !== 'string') {
        return false;
    }

    if (char.trim() === '') {
        return false;
    }

    return !isNaN(char);
}

export default function UserNotesPage() {
    const dispatch = useDispatch();
    const location = useLocation();
    const [userBookId, setUserBookId] = useState(location.pathname.split('/')[2]);
    const [notes, setNotes] = useState([]);
    const isAuth = useSelector(state => state.users.isAuth);

    useEffect(() => {
        console.log('auth', isAuth);

        dispatch(async () => {
            const url = (isNumber(userBookId) && +userBookId !== 0)
                ? urlHelper.getUrlByTemplate(
                    serviceUrls.getBookNotes,
                    {
                        id: +userBookId
                    }
                )
                : urlHelper.getUrlByTemplate(
                    serviceUrls.getNotes,
                );

            const data = await requestHelper.get(
                url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            }, isAuth);

            setNotes(data);
        })
    }, [dispatch, userBookId, isAuth]);

    const onFilterChanged = useCallback((bookId) => {
        setUserBookId(bookId);
        setNotes([]);
    }, [setUserBookId, setNotes]);

    if (notes) {
        const noteElements = notes.map((ni, ind) => {
            return (
                <div className='user-note__container' key={ni.id}>
                    <p className='user-note'>{ni.note}</p>
                </div>
            );
        })

        return (
            <BasePage>
                <PageName title={'Notes'} />
                <BookFilter onItemSelect={onFilterChanged} initialValue={isNumber(userBookId) ? +userBookId : 0} />
                <section className='user-notes__container'>
                    {noteElements}
                </section>
            </BasePage>
        );
    }
}