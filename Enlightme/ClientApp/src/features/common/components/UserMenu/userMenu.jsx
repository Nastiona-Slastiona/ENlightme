import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import requestHelper from 'src/helpers/requestHelper';
import serviceUrls from 'src/constants/serviceUrls';

import routes from "src/constants/routes";

import logout from 'src/static/images/logout';
import book from 'src/static/images/open-book';
import edit from 'src/static/images/edit';
import puzzle from 'src/static/images/puzzle';
import bell from 'src/static/images/bell';
import add_user from 'src/static/images/add-user';
import sign_in from 'src/static/images/sign-in';
import defaultUser from 'src/static/images/defaultImage';

import './userMenu.scss';
import { useDispatch, useSelector } from "react-redux";

export default function UserMenu({
    isActive,
    name,
    setIsActive
}) {
    const dispatch = useDispatch();
    const isAuth = useSelector(state => state.users.isAuth);
    const [image, setImage] = useState(defaultUser);

    useEffect(() => {
        async function fetchUserImage() {
            const response = await requestHelper.get(serviceUrls.getUserImage, { 
                method: 'GET',
                headers: {
                            'Content-Type': 'application/json',
                        },
                credentials: 'include'},
            isAuth, true);

            if (response) {
                setImage(`data:image/jpeg;base64,${response}`);
            }
        }

        
        fetchUserImage();
    }, []);


    const onLogoutClick = useCallback(async () => {
        const response = await requestHelper.get(serviceUrls.signOut, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        }, isAuth, true);
        
        if (response) {
            setIsActive(false);
            localStorage.removeItem('isAuth');
            localStorage.removeItem('access');
            localStorage.removeItem('refresh');
            
            dispatch({
                type: 'users/setUserData',
                payload: {
                    isAuth: false,
                }
            });
        }


    }, [dispatch, isAuth, setIsActive]);

    const onEditButtonClick = useCallback(() => {
        window.location.replace(routes.ACCOUNT);
    }, []);

    return (
        <div>
            <div className={isActive ? 'user-menu__info-container user-menu__info-container--active' : 'user-menu__info-container'}>
                {
                    isAuth && (
                        <div>
                            <div className="user-menu__edit-button-container">
                                <button className="user-menu__edit-button" onClick={onEditButtonClick}>
                                    <img src={edit} />
                                </button>
                            </div>
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
                                                    my uploads
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
                                        <img src={sign_in} className='user-account-info__menu-item-icon' />
                                        <a
                                            id='account'
                                            href={routes.LOG_IN}
                                            className='user-account-info__menu-item-text'
                                        >
                                            Sign In
                                        </a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    )
                }
                <div className='user-account-info__settings'>
                    {
                        isAuth && 
                        <button className="user-account-info__delete-button" onClick={onLogoutClick}>
                            <img src={logout}  />
                        </button>
                    }
                </div>
            </div>
        </div>
    )
}