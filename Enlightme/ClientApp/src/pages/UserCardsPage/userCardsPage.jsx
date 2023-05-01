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
    const dispatch = useDispatch();
    const location = useLocation();
    const [userBookId, setUserBookId] = useState(location.pathname.split('/')[2]);
    const [cards, setCards] = useState([]);
    const [mainCard, setMainCard] = useState();

    useEffect(() => {
        ( 
            async () => {
                // const url = (isNumber(userBookId) && +userBookId !== 0)
                //     ? urlHelper.getUrlByTemplate(
                //         serviceUrls.getBookCards,
                //         {
                //             id: +userBookId
                //         }
                //     )
                //     : urlHelper.getUrlByTemplate(
                //         serviceUrls.getCards,
                //     );
                const data = await requestHelper.get(
                    serviceUrls.getCards, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        credentials: 'include'
                }, true, true);
                
                if (+userBookId) {
                    console.log(data.filter(c => c.bookId === userBookId));
                    setCards(data.filter(c => c.bookId === userBookId));
                    setMainCard(data.filter(c => c.bookId === userBookId)[0]);
                } else {
                    setCards(data);
                    setMainCard(data[0]);
                }
            }
        )();
    }, [dispatch, userBookId, mainCard]);

    const onRepeatedClick = useCallback(async () => {
        const data = await requestHelper.get(
            urlHelper.getUrlByTemplate(serviceUrls.updateCard, { id: mainCard.id }),
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    intervalId: mainCard.intervalId,
                    cardId: mainCard.id
                })
            }, true, true
        );
    }, [mainCard]);

    const onFilterChanged = useCallback((bookId) => {
        setUserBookId(bookId);
        setCards([]);
    }, [setUserBookId, setCards]);

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

    const onPrevClick = useCallback(() => {
        onPrevNextClick(true);
    }, [cards, setMainCard, mainCard]);

    const mainCardItem = useMemo(() => {
        if (cards.length > 0 && mainCard) {
            const cardInd = cards.findIndex(c => c.id === mainCard.id);
            const lastIndex = cards.length - 1;

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
                            href={`#card${cardInd === 0 ? lastIndex : cardInd - 1}`}
                            className="user-cards__main-card-container__prev"
                            onClick={onPrevClick}
                        >{'<'}</a>
                        <a 
                            href={`#card${cardInd === lastIndex ? 0 : cardInd + 1}`}
                            className="user-cards__main-card-container__next"
                            onClick={onNextClick}
                        >{'>'}</a>
                    </div>
                </div>
            );
        }
    }, [mainCard, cards]);

    return (
        <BasePage needAccess={true}>
            <PageName title={'Cards'} />
            {
                cards.length > 0 
                    ?   <><BookFilter onItemSelect={onFilterChanged} initialValue={isNumber(userBookId) ? +userBookId : 0} /><section className='user-cards-section'>
                            <div className='user-card__container'>
                                <ol className='user-cards__main-card-container'>
                                    {mainCardItem}
                                </ol>
                                <span className='tooltip'>To see the meaning press and hold on the card.</span>
                                <div className='user-cards__main-card-buttons'>
                                    <button className='user_cards__card-button' onClick={onRepeatedClick}>mark as repeated</button>
                                    <button className='user_cards__card-button'>mark as finished</button>
                                </div>
                            </div>
                            <UserCardsList cards={cards} />
                        </section></>
                    : <span className='card-text'>There is no cards yet.</span>
            }
            
        </BasePage>
    );
}