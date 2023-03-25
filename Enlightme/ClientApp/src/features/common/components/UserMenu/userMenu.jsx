import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";

import routes from "src/constants/routes";

import logout from 'src/static/images/logout';
import book from 'src/static/images/open-book';
import edit from 'src/static/images/edit';
import puzzle from 'src/static/images/puzzle';
import bell from 'src/static/images/bell';
import add_user from 'src/static/images/add-user';
import account from 'src/static/images/Account';

import './userMenu.scss';
import { useDispatch, useSelector } from "react-redux";

export default function UserMenu({ isActive, name, image }) {
    const dispatch = useDispatch();
    const isAuth = useSelector(state => state.users.isAuth);
    const onLogoutClick = useCallback(async () => {
        localStorage.removeItem('isAuth');

        dispatch({
            type: 'users/setUserData',
            payload: {
                isAuth: false,
            }
        });

    }, [dispatch]);

    return (
        <div>
            <div className={isActive ? 'user-menu__info-container user-menu__info-container--active' : 'user-menu__info-container'}>
                {
                    isAuth && (
                        <div className='user-menu__info'>
                            <div className='user-menu-info__user-photo-container'>
                                <div className='user-menu-info__user-photo'>
                                    <img className='user-menu-info__user-photo-img' src={image} />
                                    <span className='user-menu-info__user-photo-name'>{name}</span>
                                </div>
                            </div>
                            <div className='user-account-info__menu-container'>
                                <nav className='user-account-info__menu-nav'>
                                    <ul className='user-account-info__menu'>
                                        <li className='user-account-info__menu-item'>
                                            <img src={book} className='user-account-info__menu-item-icon' />
                                            <Link
                                                to={routes.USER_BOOKS}
                                                className='user-account-info__menu-item-text'
                                            >
                                                my library
                                            </Link>
                                        </li>
                                        <li className='user-account-info__menu-item'>
                                            <img src={edit} className='user-account-info__menu-item-icon' />
                                            <Link
                                                to={routes.USER_NOTES}
                                                className='user-account-info__menu-item-text'
                                            >
                                                notes
                                            </Link>
                                        </li>
                                        <li className='user-account-info__menu-item'>
                                            <img src={puzzle} className='user-account-info__menu-item-icon' />
                                            <Link
                                                to={routes.USER_CARDS}
                                                className='user-account-info__menu-item-text'
                                            >
                                                cards
                                            </Link>
                                        </li>
                                        <li className='user-account-info__menu-item'>
                                            <img src={bell} className='user-account-info__menu-item-icon' />
                                            <Link
                                                to={routes.USER_NOTIFICATIONS}
                                                className='user-account-info__menu-item-text'
                                            >
                                                notifications
                                            </Link>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    )
                }
                {
                    !isAuth && (
                        <div className='user-account-info__menu-container'>
                            <nav className='user-account-info__menu-nav'>
                                <ul className='user-account-info__menu'>
                                    <li className='user-account-info__menu-item'>
                                        <img src={add_user} className='user-account-info__menu-item-icon' />
                                        <a
                                            id='add-user'
                                            href={routes.SIGN_UP}
                                            className='user-account-info__menu-item-text'
                                        >
                                            Sign Up
                                        </a>
                                    </li>
                                    <li className='user-account-info__menu-item'>
                                        <img src={account} className='user-account-info__menu-item-icon' />
                                        <a
                                            id='account'
                                            href={routes.ACCOUNT}
                                            className='user-account-info__menu-item-text'
                                        >
                                            Log In
                                        </a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    )
                }
                <div className='user-account-info__settings'>
                    {
                        isAuth && <img src={logout} onClick={onLogoutClick} />
                    }
                </div>
            </div>
        </div>
    )
}