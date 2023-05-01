import React, { useEffect, useState, useRef, useCallback } from "react";
import { ReactReader, ReactReaderStyle } from 'react-reader'
import { useDispatch, useSelector } from "react-redux";
import { generateRequestUrl } from "google-translate-api-browser";
import { useLocation } from 'react-router-dom';

import BasePage from "src/components/base/BasePage/basePage";

import requestHelper from 'src/helpers/requestHelper';
import serviceUrls from 'src/constants/serviceUrls';
import urlHelper from "src/helpers/urlHelper";
import env from 'src/env';

import './readBookPage.scss';
import fileHelper from "../../helpers/fileHelper";


const API_KEY = [env.TRANSLATE_API_KEY];
const fromLang = 'en';
const toLang = 'ru';

const url = `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`;


const ownStyles = {
    ...ReactReaderStyle,
    readerArea: {
        ...ReactReaderStyle.readerArea,
        borderRadius: '35px'
    },
    arrow: {
        ...ReactReaderStyle.arrow,
        color: '$accent-color'
    },
    tocArea: {
        ...ReactReaderStyle.tocArea,
        top: '0px',
        height: '50rem',
        overflowY: 'scroll',
        borderRadius: '35px',
        left: '10px'
    }
}

export default function ReadBookPage() {
    const dispatch = useDispatch();
    const locationUrl = useLocation();
    const bookId = +locationUrl.pathname.slice(6, 8) || +location.pathname.slice(6, 7);
    const [book, setBook] = useState();
    const [selections, setSelections] = useState([]);
    const [translation, setTranslation] = useState('');
    const [word, setWord] = useState('');

    const [location, setLocation] = useState(null);
    const locationChanged = epubcifi => {
        setLocation(epubcifi)
    }

    const [isAbleToAddCard, setIsAbleToSetCard] = useState(false);

    const userBookId = useSelector(state => state.books.userBookId);
    const renditionRef = useRef(null)

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
                    }, true
                );

                if (data) {
                    setBook(data);
                };
            })
        }
    }, [bookId, dispatch, setBook]);

    const setSelection = useCallback(rendition => {
        renditionRef.current = rendition
        renditionRef.current.themes.default({
            '::selection': {
                background: 'orange'
            }
        });
        setSelections([])
    }, [setSelections]);

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
            serviceUrls.createCard, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                value: selections[0].text,
                translation: translatedText,
                bookId: book.id
            })
        }, true, true);

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

    if (selections[0]?.text.trim().split(' ').length === 1 && !isAbleToAddCard) {
        setIsAbleToSetCard(true);
    }

    const bookContent = fileHelper.createBlobFile(fileHelper.base64ToArrayBuffer(book.content));

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
                <button className="read-book__add-text-button" disabled={!isAbleToAddCard} >
                    <span className="read-book__add-text" onClick={onAddCardClick}>Add Card</span>
                </button>
            </div>
            <section className='reader__container'>
                <div className='reader'>
                    <ReactReader
                        title={book.title}
                        location={location}
                        locationChanged={locationChanged}
                        readerStyles={ownStyles}
                        url={bookContent}
                        getRendition={setSelection}
                    />
                </div>
            </section>
        </BasePage>
    )
}