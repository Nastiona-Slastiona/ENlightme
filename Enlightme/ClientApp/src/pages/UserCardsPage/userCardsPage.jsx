import React, { useState, useEffect, useCallback } from 'react'

import BasePage from "src/components/base/BasePage/basePage";
import PageName from 'src/features/common/components/PageName/pageName';
import UserCardsList from 'src/features/user-cards-page/components/userCardsList/userCardsList';
import BookFilter from 'src/features/common/components/BookFilter/bookFilter';

import './userCardsPage.scss';
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

export default function UserCardsPage() {
    const dispatch = useDispatch();
    const location = useLocation();
    const [userBookId, setUserBookId] = useState(location.pathname.split('/')[2]);
    const [cards, setCards] = useState([]);

    useEffect(() => {
        dispatch(async () => {
            const url = (isNumber(userBookId) && +userBookId !== 0)
                ? urlHelper.getUrlByTemplate(
                    serviceUrls.getBookCards,
                    {
                        id: +userBookId
                    }
                )
                : urlHelper.getUrlByTemplate(
                    serviceUrls.getCards,
                );

            const data = await requestHelper.get(
                url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }, true);

            setCards(data);
        })
    }, [dispatch, userBookId]);

    const onFilterChanged = useCallback((bookId) => {
        setUserBookId(bookId);
        setCards([])
    }, [setUserBookId, setCards]);

    if (cards) {
        const cardsItem = cards.map((card, ind) => {
            const lastIndex = cards.length - 1;

            return (
                <li
                    className='user-cards__main-card'
                    key={card.id}
                    id={`card${ind}`}
                >
                    <div className='user-cards__main-card--front'>
                        <span className='card-text'>{card.word}</span>
                    </div>
                    <div className='user-cards__main-card--back'>
                        <span className='card-text'>{card.translation}</span>
                    </div>
                    <div className="carousel__navigation">
                        <a href={`#card${ind === 0 ? lastIndex : ind - 1}`}
                            className="user-cards__main-card-container__prev">{'<'}</a>
                        <a href={`#card${ind === lastIndex ? 0 : ind + 1}`}
                            className="user-cards__main-card-container__next">{'>'}</a>
                    </div>
                </li>
            )
        });

        return (
            <BasePage needAccess={true}>
                <PageName title={'Cards'} />
                <BookFilter onItemSelect={onFilterChanged} initialValue={isNumber(userBookId) ? +userBookId : 0} />
                <section className='user-cards-section'>
                    <div className='user-card__container'>
                        <ol className='user-cards__main-card-container'>
                            {cardsItem}
                        </ol>
                        <span className='tooltip'>To see the meaning press and hold on the card.</span>
                        {/* <div className='user-cards__main-card-buttons'>
                            <button className='user_cards__card-button'>mark as repeated</button>
                            <button className='user_cards__card-button'>mark as finished</button>
                        </div> */}
                    </div>
                    <UserCardsList cards={cards} />
                </section>
            </BasePage>
        );
    }
}