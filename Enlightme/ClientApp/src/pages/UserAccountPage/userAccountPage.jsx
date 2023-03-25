import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

import AuthPage from 'pages/LoginPage/loginPage';
import BasePage from 'src/components/base/BasePage/basePage';
import PageName from 'src/features/common/components/PageName/pageName';
import Input from 'components/base/Input/input';
import PagesMenu from 'features/common/components/PagesMenu/pagesMenu';

import urlHelper from "src/helpers/urlHelper";
import serviceUrls from "src/constants/serviceUrls";
import requestHelper from "src/helpers/requestHelper";

import photo from 'src/static/images/kit_ava.png';

import './userAccountPage.scss';

const UserAccount = () => {
    const isAuth = useSelector(state => state.users.isAuth);
    const [user, setUser] = useState();
    const [fullName, setFullName] = useState('');
    const [username, setUsername] = useState('');
    const [image, setImage] = useState('');
    const [notifications, setNotifications] = useState(false);
    const [validation, setValidation] = useState('');

    const onFullNameChange = useCallback(e => {
        setFullName(e.target.value);
    }, [setFullName]);

    const onNotificationsChange = useCallback(() => {
        setNotifications(prevState => !prevState);
    }, [setNotifications]);

    const onUsernameChange = useCallback(e => {
        if (e.target.value === '') {
            setValidation('Username should have some value!');
        } else {
            setUsername(e.target.value);
            setValidation('');
        }
    }, [setValidation, setUsername]);

    const onImageChange = useCallback(e => {
        setImage(e.target.files[0]);
    }, [setImage]);

    useEffect(() => {
        async function fetchUser() {
            const response = await requestHelper.get(serviceUrls.getUserSettings, { method: 'GET', headers: {} }, true);

            if (response) {
                setUser(response);
                setFullName(response.first_name + ' ' + response.last_name);
                setImage(response.photo);
                setUsername(response.username);
                setNotifications(response.send_notifications);
            }
        }

        if (!user) {
            fetchUser();
        }

    }, [setUser]);

    const onFormSubmit = useCallback(async (e) => {
        if (username !== user.username || fullName !== user.first_name + ' ' + user.last_name || image !== user.photo || notifications !== user.send_notifications) {            
            if (validation === '') {
                const userData = {
                    first_name: fullName.split('')[0], last_name: fullName.split('')[2], username: username,
                photo: image, send_notifications: notifications
            };

            const formData = new FormData();
            Object.keys(userData).forEach(key => formData.append(key, userData[key]))
            
            const response = await requestHelper.get(
                serviceUrls.updateUserSettings,
                {
                    method: 'PUT',
                    headers: {},
                    body: formData
                }, true);
            }
        }
        else {
            e.preventDefault();
        }
    }, [fullName, username, image, notifications]);

    if (!user) {
        return;
    }
    


    return isAuth ? (
        <BasePage>
            <PagesMenu />
            <PageName title={'My account'} />
            <section className='user-account__container'>
                <form className='user-account__form' id='form' onSubmit={onFormSubmit}>
                    <div className='user-account__form-fields'>
                        <div className='user-account__image-form-field'>
                            <div className='user-account__image-container'><img src={image} className='user-account__image' /></div>
                            <div className='user-account__image-input'>
                                <input type={'file'} id='file-upload' name='photo' onChange={onImageChange} />
                                <label htmlFor='file-upload' >upload new photo</label>
                            </div>
                        </div>
                        <div className='user-account-form__info-fields'>
                            <div className='user-account-form__info-field-column'>
                                <Input
                                    type={'text'}
                                    value={fullName}
                                    label={'Full Name'}
                                    name='fullname'
                                    placeholder={'Enter full name...'}
                                    onChange={onFullNameChange}
                                />
                                <Input
                                    type={'text'}
                                    value={username}
                                    label={'Display Name'}
                                    name='username'
                                    placeholder={'Enter display name...'}
                                    onChange={onUsernameChange}
                                />
                                {
                                    validation !== '' && (<span>{validation}</span>)
                                }
                                <select id='languages' className='select-language' name='language' disabled>
                                    <option value={'english'} className='select-language__option'>English</option>
                                    <option value={'russion'}>Русский</option>
                                </select>
                            </div>
                            <div className='user-account-form__info-field-column'>
                                <div>
                                    <input
                                        type={'checkbox'}
                                        className='checkbox-input'
                                        id='checkbox'
                                        name='checkbox'
                                        defaultChecked={notifications}
                                        onChange={onNotificationsChange}
                                    />
                                    <label htmlFor='checkbox' className='checkbox-label'>
                                        <span className='checkbox'></span>
                                        send notifications
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='submit-button__container'>
                        <input type='submit' value={'save changes'} className='submit-button' />
                    </div>
                </form>
            </section>
        </BasePage>
    ) : <AuthPage />
}

export default UserAccount;