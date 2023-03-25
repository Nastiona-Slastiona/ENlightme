import React from 'react';

import Header from "src/features/common/components/Header/header";
import Footer from "src/features/common/components/Footer/footer";

import './basePage.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import requestHelper from 'src/helpers/requestHelper';
import serviceUrls from 'src/constants/serviceUrls';

import routes from "src/constants/routes";

export default function BasePage({ children, isLoginPage = false, needAccess = false }) {
    const dispatch = useDispatch();
    const isAuth = useSelector(state => state.users.isAuth);
    const [name, setName] = useState('');
    const [image, setImage] = useState('');

    useEffect(() => {
        (
            async () => {
                const isAuth = JSON.parse(localStorage.getItem('isAuth'));

                if (isAuth) {
                    const user = await requestHelper.get(
                        serviceUrls.getUser, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }, isAuth);
                    const photo = await requestHelper.get(
                        serviceUrls.getUserPhoto, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }, isAuth);
                    setName(user.username);
                    setImage(photo.photo);
                    dispatch({
                        type: 'users/setUserData',
                        payload: {
                            isAuth: true,
                            username: user.username
                        }
                    });
                }

                if (needAccess && !isAuth) {
                    window.location.replace(routes.LOG_IN);
                }
            })();
    });
    // }

    return (
        <div>
            <div className='base-page'>
                <Header isLoginPage={isLoginPage} name={name} image={image} />
                <div className='base-page__content'>
                    {children}
                </div>
            </div>
            <Footer mode='Light' />
        </div>
    )
}