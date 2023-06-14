import React, { useState, useEffect, useCallback, useMemo } from 'react'

import BasePage from "src/components/base/BasePage/basePage";
import PageName from 'src/features/common/components/PageName/pageName';
import UserCardsList from 'src/features/user-cards-page/components/userCardsList/userCardsList';
import BookFilter from 'src/features/common/components/BookFilter/bookFilter';

import './userCardsPage.scss';
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import serviceUrls from "src/constants/serviceUrls";
import requestHelper from "src/helpers/requestHelper";
import urlHelper from "src/helpers/urlHelper";
import LanguageFilter from '../../features/user-cards-page/components/languageFilter/languageFilter';


function isNumber(char) {
    if (typeof char !== 'string') {
        return false;
    }

    if (char.trim() === '') {
        return false;
    }

    return !isNaN(char);
}

export default function UserCardsPage() {
    const location = useLocation();
    const userBookId = +location.pathname.split('/')[2];
    const onlyLearn = location.pathname.includes('learn');

    const dispatch = useDispatch();
    const [bookId, setBookId] = useState(userBookId);
    const [cards, setCards] = useState();
    const [filtredCards, setFiltredCards] = useState(cards);
    const [mainCard, setMainCard] = useState();

    useEffect(() => {
        ( 
            async () => {
                if (!cards) {
                    const url = onlyLearn ? serviceUrls.getCardsLearn : serviceUrls.getCards;

                    const data = await requestHelper.get(
                        url, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        credentials: 'include'
                    }, true, true);
                
                    if (userBookId) {
                        console.log(userBookId, data);
                        setCards(data.filter(c => c.bookId === userBookId));
                        setMainCard(data.filter(c => c.bookId === userBookId)[0]);
                    } else {
                        setCards(data);
                        setMainCard(data[0]);
                    }
                }
            }
        )();
    }, [dispatch, userBookId, mainCard]);

    const onRepeatedClick = useCallback(() => {
        onButtonClick();
    }, [onButtonClick, mainCard, cards]);

    const onFinishedClick = useCallback(() => {
        onButtonClick(true);
    }, [onButtonClick, mainCard, cards]);

    const onButtonClick = useCallback(async (isFinishButton=false) => {
        const lastIndex = cards.length - 1;
        const cardInd = cards.findIndex(c => c.id === mainCard.id);

        const selectStatement = cardInd === lastIndex 
            ? 0 
            : cardInd + 1
        setMainCard(cards[selectStatement]);
        setCards(cards.filter(c => c.id !== mainCard.id));

        await requestHelper.get(
            urlHelper.getUrlByTemplate(serviceUrls.updateCard, { id: mainCard.id }),
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    intervalId: isFinishButton ? 6 : mainCard.intervalId,
                    cardId: mainCard.id
                })
            }, true, true
        );
    }, [mainCard, cards]);

    const onFilterChanged = useCallback((selectedBookId) => {
        setBookId(selectedBookId);
        if (+selectedBookId === 0) {
            setFiltredCards(cards);
        } else {
            setFiltredCards(cards.filter(c => c.bookId === +selectedBookId));
            setMainCard(cards.filter(c => c.bookId === +selectedBookId)[0]);
        }
    }, [setBookId, setFiltredCards, cards, setMainCard]);

    const onLangChanged = useCallback((selectedLangId) => {
        if (+selectedLangId === 0) {
            setFiltredCards(cards);
        } else {
            setFiltredCards(cards.filter(c => c.languageId === +selectedLangId));
            setMainCard(cards.filter(c => c.languageId === +selectedLangId)[0]);
        }
    }, [setBookId, setCards, cards, setMainCard]);

    const onPrevNextClick = useCallback((isPrev = false) => {
        const lastIndex = cards.length - 1;
        const cardInd = cards.findIndex(c => c.id === mainCard.id);
        const selectStatement = isPrev 
            ? cardInd === 0 
                ? lastIndex 
                : cardInd - 1 
            : cardInd === lastIndex 
                ? 0 
                : cardInd + 1
        setMainCard(cards[selectStatement])
    }, [cards, setMainCard, mainCard]);

    const onNextClick = useCallback(() => {
        onPrevNextClick();
    }, [cards, setMainCard, mainCard]);

    const onPrevClick = useCallback((e) => {
        onPrevNextClick(true);
    }, [cards, setMainCard, mainCard]);

    const mainCardItem = useMemo(() => {
        if (cards && mainCard) {
            return (
                <div className='user-cards__main-card'>
                    <div className='user-cards__main-card--front'>
                        <span className='card-text'>{mainCard.value}</span>
                    </div>
                    <div className='user-cards__main-card--back'>
                        <span className='card-text'>{mainCard.translation}</span>
                    </div>
                    <div className="carousel__navigation">
                        <a
                            className="user-cards__main-card-container__prev"
                            onClick={onPrevClick}
                        >{'<'}</a>
                        <a
                            className="user-cards__main-card-container__next"
                            onClick={onNextClick}
                        >{'>'}</a>
                    </div>
                </div>
            );
        }
    }, [mainCard, cards, onNextClick, onPrevClick]);

    return (
        <BasePage needAccess={true}>
            <LanguageFilter onItemSelect={onLangChanged} />
            <PageName title={'Cards'} />
            {
                cards
                    ?  <>
                        {
                            !userBookId && 
                                <BookFilter
                                    onItemSelect={onFilterChanged}
                                    initialValue={isNumber(bookId) ? +bookId : 0} 
                                />
                        } 
                        <section className='user-cards-section'>
                                <div className='user-card__container'>
                                    <ol className='user-cards__main-card-container'>
                                        {mainCardItem}
                                    </ol>
                                    <span className='tooltip'>To see the meaning press and hold on the card.</span>
                                    <div className='user-cards__main-card-buttons'>
                                        <button className='user_cards__card-button' onClick={onRepeatedClick}>mark as repeated</button>
                                        <button className='user_cards__card-button' onClick={onFinishedClick}>mark as finished</button>
                                    </div>
                                </div>
                                <UserCardsList cards={filtredCards || cards} setCards={filtredCards ? setFiltredCards : setCards} />
                            </section></>
                    : <span className='card-text'>There is no cards yet.</span>
            }
            
        </BasePage>
    );
}