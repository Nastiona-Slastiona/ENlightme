import React, { useCallback, useState } from "react";
import { Navigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import BasePage from "src/components/base/BasePage/basePage";
import Input from 'components/base/Input/input';
import PageName from 'src/features/common/components/PageName/pageName';

import './loginPage.scss';
import requestHelper from "src/helpers/requestHelper";
import serviceUrls from "src/constants/serviceUrls";
import routes from "src/constants/routes";
import { useDispatch, useSelector } from "react-redux";


export default function LoginPage() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState('');
    
    const isAuth = useSelector(state => state.users.isAuth);

    const onEmailChange = useCallback(e => {
        setEmail(e.target.value);
    }, []);

    const onPasswordChange = useCallback(e => {
        setPassword(e.target.value);
    }, []);

    const onFormSubmit = useCallback(async e => {
        e.preventDefault();

        const response = await requestHelper.get(serviceUrls.login, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                password,
                email: email
            }),
        }, isAuth);

        if (response) {
            localStorage.setItem('access', JSON.stringify(response.accessToken))
            localStorage.setItem('refresh', JSON.stringify(response.refreshToken))
            localStorage.setItem('isAuth', JSON.stringify(true));
            setRedirect(true);

            dispatch({
                type: 'users/setUserData',
                payload: {
                    isAuth: true,
                }
            });
        }
    }, [password, email, dispatch]);

    if (isAuth || redirect) {
        return (
            <Navigate to={routes.HOME} />
        );
    }

    return (
        <div className="page-container">
            <BasePage isLoginPage>
                <PageName title={'Log In'} />
                <form className="login-page__form" onSubmit={onFormSubmit}>
                    <div className="login-page__form-fields">
                        <Input type={'text'} placeholder={'email'} onChange={onEmailChange} withBorder={true} />
                        <Input type={'password'} placeholder={'password'} onChange={onPasswordChange} withBorder={true} />
                    </div>
                    <span className="login-page__register">or you can
                        <Link to={routes.SIGN_UP} className='login-page__register-link'>register</Link>
                    </span>
                    <div className="login-page__button-container">
                        <button type="submit" className="login-page__button">log in</button>
                    </div>
                </form>
            </BasePage>
        </div>
    )
}
