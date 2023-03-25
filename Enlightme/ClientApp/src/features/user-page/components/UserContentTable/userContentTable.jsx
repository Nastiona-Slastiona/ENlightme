import React from 'react'


import './userContentTable.scss';

export default function UserContentTable({ items }) {
    return (
        <section className='user-content'>
            <div className='user-content__recently-section'>
                <span className='user-content__header'>недавние</span>
                <div className='user-content__content'>
                    <div className='user-content__content-recently'>
                        <div className='user-content-recently__item'>{items}</div>
                        <div className='user-content-recently__item'></div>
                        <div className='user-content-recently__item'></div>
                    </div>
                </div>
            </div>
            <div className='user-content__all-section'>
                <span className='user-content__header'>все</span>
                <div className='user-content__content user-content__all-content'>
                    <div className='user-content__all-section'>
                        <div className='user-content__item'></div>
                        <div className='user-content__item'></div>
                        <div className='user-content__item'></div>
                        <div className='user-content__item'></div>
                    </div>
                </div>
            </div>
        </section>
    )
}