import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import requestHelper from 'src/helpers/requestHelper';
import serviceUrls from 'src/constants/serviceUrls';

import Header from "src/features/common/components/Header/header";
import Footer from "src/features/common/components/Footer/footer";

import './basePage.scss';

export default function BasePage({ children }) {
    const dispatch = useDispatch();
    const isAuth = JSON.parse(localStorage.getItem('isAuth'));
    const userName = useSelector(state => state.users.username);
    const notifications = useSelector(state => state.users.notifications);

    useEffect(() => {
        (
            async () => {
                if (isAuth) {
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

                if (!notifications) {
                    const notificationData = await requestHelper.get(
                        serviceUrls.getNotifications, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        credentials: 'include'
                    }, isAuth, true);
    
                    if (notificationData) {
                        dispatch({
                            type: 'users/setUserNotifications',
                            payload: {
                                notifications: notificationData
                            }
                        })
                    }
                }
            }
        )();

        // if (!isAuth && !isLoginPage) {
        //     window.location.replace(routes.LOG_IN);
        // }
    }, []);


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