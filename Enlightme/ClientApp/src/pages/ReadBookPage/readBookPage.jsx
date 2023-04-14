import React, { useEffect, useState, useRef, useCallback } from "react";
import { ReactReader, ReactReaderStyle } from 'react-reader'
import { useDispatch, useSelector } from "react-redux";
import { generateRequestUrl } from "google-translate-api-browser";
import { useLocation } from 'react-router-dom';

import BasePage from "src/components/base/BasePage/basePage";
import Logo from "src/features/common/components/Logo/logo";

import {fetchBook, fetchUserBookId} from "src/store/books/thunks/bookThunk";
import requestHelper from 'src/helpers/requestHelper';
import serviceUrls from 'src/constants/serviceUrls';
import urlHelper from "src/helpers/urlHelper";
import env from 'src/env';

import './readBookPage.scss';

const API_KEY = [env.TRANSLATE_API_KEY];
const fromLang = 'en';
const toLang = 'ru';

const url = `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`;


const ownStyles = {
    ...ReactReaderStyle,
    readerArea: {
        ...ReactReaderStyle.readerArea,
        borderRadius: '15px'
    },
    arrow: {
        ...ReactReaderStyle.arrow,
        color: '$accent-color'
    },
    tocArea: {
        ...ReactReaderStyle.tocArea,
        top: '250px',
        height: '40rem',
        overflowY: 'scroll',
        borderRadius: '15px 0 0 15px',
        left: '100px'
    }
}

export default function ReadBookPage() {
    const dispatch = useDispatch();
    const [selections, setSelections] = useState([]);
    const [translation, setTranslation] = useState('');
    const [word, setWord] = useState('');
    const [note, setNote] = useState(false);

    const [isAbleToAddNote, setIsAbleToSetNote] = useState(false);
    const [isAbleToAddCard, setIsAbleToSetCard] = useState(false);

    const book = useSelector(state => state.books.selectedBook);
    const userBookId = useSelector(state => state.books.userBookId);
    const renditionRef = useRef(null)

    const [location, setLocation] = useState(null);
    const locationChanged = epubcifi => {
        setLocation(epubcifi)
    }
    const localUrl = useLocation();
    const bookId = +localUrl.pathname.slice(11);

    const onAddNoteClick = useCallback(async () => {
        console.log(123134, userBookId)
        console.log(book);
        console.log(selections)
        console.log(selections[0].text);
        const response = await requestHelper.get(
            urlHelper.getUrlByTemplate(serviceUrls.createNote, { id: userBookId.id }), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                note: selections[0].text
            })
        }, true);

        if (response) {
            setNote(true);

            setTimeout(() => {
                setNote(false);
            }, 3000);
        }
    }, [setNote, selections]);

    const onAddCardClick = useCallback(async () => {
        const currentUrl = Object.assign(url)
            .toString()
            .concat(`&q=${encodeURI(generateRequestUrl(selections[0].text))}&source=${fromLang}&target=${toLang}`);

        const translate = await fetch(currentUrl, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            }
        });
        const { data } = await translate.json();
        const { translatedText } = await data.translations[1];

        const response = await requestHelper.get(
            urlHelper.getUrlByTemplate(serviceUrls.createCard, { id: userBookId.id }), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                word: selections[0].text,
                translation: translatedText
            })
        }, true);

        if (response) {
            setTranslation(translatedText);
            setWord(selections[0].text);

            setTimeout(() => {
                setTranslation('');
                setWord('');
            }, 7000);
        }
    }, [selections, setTranslation]);

    useEffect(() => {
        if (!book) {
            dispatch(fetchBook({id: bookId, isAuth: true}));
        }
        if (!userBookId && bookId) {
            dispatch(fetchUserBookId({id: bookId, isAuth: true}));
        }

        if (renditionRef.current) {
            function setRenderSelection(cfiRange, contents) {
                setSelections([
                    {
                        text: renditionRef.current.getRange(cfiRange).toString(),
                        cfiRange
                    }]
                )
                renditionRef.current.annotations = {};
                renditionRef.current.annotations.add(
                    'highlight',
                    cfiRange,
                    {},
                    null,
                    'hl',
                    { fill: 'orange', 'fill-opacity': '0.5', 'mix-blend-mode': 'multiply' }
                )
                contents.window.getSelection().removeAllRanges()
            }
            renditionRef.current.on('selected', setRenderSelection)
            return () => {
                renditionRef.current.off('selected', setRenderSelection)
            }
        }
    }, [dispatch, book, setSelections, selections]);

    if (!book) {
        return null;
    }

    if (selections[0]?.text.trim().split(' ').length > 1 && !isAbleToAddNote) {
        setIsAbleToSetNote(true);
        setIsAbleToSetCard(false);
    }

    if (selections[0]?.text.trim().split(' ').length === 1 && !isAbleToAddCard) {
        setIsAbleToSetCard(true);
        setIsAbleToSetNote(false);
    }

    return (
        <BasePage needAccess={true}>
            <div className="read-book-logo__container">
                {
                    translation && (
                        <div className="read-book__data-added">
                            <p>Card was added!</p><br />
                            Word: {word}<br />Translation: {translation}
                        </div>
                    )
                }
                {
                    note && (
                        <div className="read-book__data-added">
                            <p>Note was added!</p>
                        </div>
                    )
                }
                {
                    (isAbleToAddCard || isAbleToAddNote) && (
                        <button className="read-book__add-text-button">
                            {
                                isAbleToAddNote && (<span className="read-book__add-text" onClick={onAddNoteClick}>Add Note</span>)
                            }
                            {
                                isAbleToAddCard && (<span className="read-book__add-text" onClick={onAddCardClick}>Add Card</span>)
                            }
                        </button>
                    )
                }
            </div>
            <section className='reader__container'>
                <div className='reader'>
                    <ReactReader
                        title={book.title}
                        location={location}
                        locationChanged={locationChanged}
                        readerStyles={ownStyles}
                        url={book.url}
                        getRendition={rendition => {
                            renditionRef.current = rendition
                            renditionRef.current.themes.default({
                                '::selection': {
                                    background: 'orange'
                                }
                            })
                            setSelections([])
                        }}
                    />
                </div>
            </section>
        </BasePage>
    )
}