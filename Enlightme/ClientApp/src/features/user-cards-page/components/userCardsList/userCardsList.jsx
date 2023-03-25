import React, { useCallback } from "react";

import requestHelper from 'src/helpers/requestHelper';
import serviceUrls from 'src/constants/serviceUrls';
import urlHelper from "src/helpers/urlHelper";

import cross from 'src/static/images/cross-delete';

import './userCardsList.scss';


export default function UserCardsList({ cards }) {

    const onButtonClick = useCallback(async (e) => {
        const card = Array.from(cards).find(c => c.id === +e.target.id);

        const response = await requestHelper.get(
            urlHelper.getUrlByTemplate(serviceUrls.deleteCard, { bookId: card.book, id: card.id }), {
            method: 'DELETE',
            headers: {}
        }, true);

        window.location.reload();
    }, [cards]);

    const userCards = cards.map((card, ind) => {
        return (
            <div className='user-card-item' key={card.id}>
                <span className='card-item__value'>{card.word}</span>
                <button className='card-item__remove-button' onClick={onButtonClick}>
                    <img src={cross} id={card.id} />
                </button>
            </div>
        )
    });

    return (
        <div className='user-cards-list'>
            {userCards}
        </div>
    );
}