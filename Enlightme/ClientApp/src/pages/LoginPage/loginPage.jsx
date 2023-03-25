import React, { useCallback, useState } from "react";
import { Navigate } from 'react-router-dom';

import BasePage from "src/components/base/BasePage/basePage";
import Input from 'components/base/Input/input';
import PageName from 'src/features/common/components/PageName/pageName';
import PagesMenu from "features/common/components/PagesMenu/pagesMenu";

import './loginPage.scss';
import requestHelper from "src/helpers/requestHelper";
import serviceUrls from "src/constants/serviceUrls";
import routes from "src/constants/routes";
import { useDispatch, useSelector } from "react-redux";


export default function LoginPage() {
    const dispatch = useDispatch();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const isAuth = useSelector(state => state.users.isAuth);

    const onUsernameChange = useCallback(e => {
        setUsername(e.target.value);
    }, []);

    const onPasswordChange = useCallback(e => {
        setPassword(e.target.value);
    }, []);

    const onFormSubmit = useCallback(async e => {
        e.preventDefault();

        const response = await requestHelper.get(serviceUrls.signIn, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                password,
                username: username
            }),
        });

        if (response) {
            localStorage.setItem('access', JSON.stringify(response.access))
            localStorage.setItem('refresh', JSON.stringify(response.refresh))
            localStorage.setItem('isAuth', JSON.stringify(true))

            dispatch({
                type: 'users/setUserData',
                payload: {
                    isAuth: true,
                }
            });
        }
    }, [password, username]);

    if (isAuth) {
        return (
            <Navigate to={routes.HOME} />
        );
    }

    return (
        <BasePage isLoginPage={true}>
            <PagesMenu />
            <PageName title={'Log In'} />
            <section className="login-page__section" onSubmit={onFormSubmit}>
                <form className="login-page__form">
                    <div className="login-page__form-fields">
                        <Input type={'text'} placeholder={'username'} onChange={onUsernameChange} />
                        <Input type={'password'} placeholder={'password'} onChange={onPasswordChange} />
                    </div>
                    <div className="login-page__button-container">
                        <button type="submit" className="login-page__button"> log in</button>
                    </div>
                </form>
            </section>
        </BasePage>
    )
}
