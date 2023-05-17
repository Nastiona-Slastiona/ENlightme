import React, { useEffect, useState, useRef, useCallback } from "react";
import { ReactReader, ReactReaderStyle } from 'react-reader'
import { useDispatch } from "react-redux";
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
const fromLang = 'fr';
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
    const [translation, setTranslation] = useState();
    const [word, setWord] = useState('');

    const [location, setLocation] = useState(null);
    const locationChanged = epubcifi => {
        setLocation(epubcifi);
    };

    const [isAbleToAddCard, setIsAbleToSetCard] = useState(false);

    const renditionRef = useRef(null);

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
    }, [bookId, dispatch, setBook, selections, translation]);

    useEffect(() => {
        if (selections && !translation) {

            const lang = book ? book.language.abbreviation : fromLang;

            dispatch(async () => {
                const currentUrl = Object.assign(url)
                .toString()
                .concat(`&q=${encodeURI(generateRequestUrl(selections.text))}&source=${lang}&target=${toLang}`);

                const translate = await fetch(currentUrl, {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json"
                    }
                });

                const { data } = await translate.json();
                const { translatedText } = await data.translations[1];

                setTranslation(translatedText);
                setWord(selections.text);
            });
        }
    }, [book, dispatch, setBook, selections, translation]);

    const setSelection = useCallback((rendition) => {
        renditionRef.current = rendition
        renditionRef.current.themes.default({
            '::selection': {
                background: 'orange'
            }
        });
        setSelections([]);
    }, [setSelections]);

    const onLearnClick = useCallback(async () => {
        const response = await requestHelper.get(
            serviceUrls.createCard, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                value: selections.text,
                translation: translation,
                bookId: book.id
            })
        }, true, true);

        if (response) {
            setTimeout(() => {
                setTranslation('');
                setWord('');
            }, 7000);
        }
    }, [translation, setTranslation, book]);

    const onSkipClick = useCallback(async () => {
        setTranslation('');
        setWord('');
        setSelections();
    }, [setWord, setTranslation, setSelections]);

    useEffect(() => {
        if (renditionRef.current) {
            function setRenderSelection(cfiRange) {
                setSelections(
                    {
                        text: renditionRef.current.getRange(cfiRange).toString(),
                        cfiRange
                    }
                )
                renditionRef.current.annotations = {};
            }

            renditionRef.current.on('selected', setRenderSelection)
            
            return () => {
                renditionRef.current.off('selected', setRenderSelection)
            }
        }
    }, [dispatch, book, setSelections, renditionRef]);

    if (!book) {
        return null;
    }

    if (selections?.text && !isAbleToAddCard) {
        setIsAbleToSetCard(true);
    }

    const bookContent = fileHelper.createBlobFile(fileHelper.base64ToArrayBuffer(book.content));

    return (
        <BasePage needAccess={true}>
            <div className="read-book-translation__container">
                {
                    translation && (
                        <><div className="read-book__data-to-add">
                            <span className="read-book__translation">
                               <div>
                                    Word: {word}
                               </div>
                               <div>
                                    Translation: {translation}
                               </div> 
                            </span>
                            <div className="read-book__translation-buttons">
                                <button className="read-book__translation-button" onClick={onLearnClick}>
                                    Learn
                                </button>
                                <button className="read-book__translation-button" onClick={onSkipClick}>
                                    Skip
                                </button>
                            </div>
                        </div>
                        </>
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
                        url={bookContent}
                        getRendition={setSelection}
                    />
                </div>
            </section>
        </BasePage>
    )
}