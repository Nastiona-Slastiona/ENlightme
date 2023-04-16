import React from 'react';

import Header from "src/features/common/components/Header/header";
import Footer from "src/features/common/components/Footer/footer";

import './basePage.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import requestHelper from 'src/helpers/requestHelper';
import serviceUrls from 'src/constants/serviceUrls';

export default function BasePage({ children, isLoginPage = false, needAccess = false }) {
    const dispatch = useDispatch();
    const isAuth = JSON.parse(localStorage.getItem('isAuth'));
    const userName = useSelector(state => state.users.username);

    useEffect(() => {
        (
            async () => {
                if (!userName && isAuth) {
                    const user = await requestHelper.get(
                        serviceUrls.getUser, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        credentials: 'include'
                    }, isAuth, true);
                    
                    if (user) {
                        dispatch({
                            type: 'users/setUserData',
                            payload: {
                                isAuth: true,
                                username: user.firstName
                            }
                        });
                    }
                }

            }
        )();

        // if (!isAuth && !isLoginPage) {
        //     window.location.replace(routes.LOG_IN);
        // }
    }, [userName]);


    return (
        <div className='base-page'>
            <Header name={userName} />
            <div className='base-page__content'>
                {children}
            </div>
            <Footer />
        </div>
    )
}