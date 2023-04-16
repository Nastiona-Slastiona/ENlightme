import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

import BasePage from 'src/components/base/BasePage/basePage';
import PageName from 'src/features/common/components/PageName/pageName';
import Input from 'components/base/Input/input';
import defaultUser from 'src/static/images/defaultImage';

import routes from "src/constants/routes";
import serviceUrls from "src/constants/serviceUrls";
import requestHelper from "src/helpers/requestHelper";

import './userAccountPage.scss';

const UserAccount = () => {
    const isAuth = useSelector(state => state.users.isAuth);
    const [user, setUser] = useState();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [userImage, setImage] = useState({ imageFile: null, imageSrc: defaultUser });
    const [notifications, setNotifications] = useState(false);
    const [validation, setValidation] = useState('');

    const onFirstNameChange = useCallback(e => {
        if (e.target.value === '') {
            setValidation('Username should have some value!');
        } else {
            setFirstName(e.target.value);
        }
    }, [setFirstName]);

    const onNotificationsChange = useCallback(() => {
        setNotifications(prevState => !prevState);
    }, [setNotifications]);

    const onLastNameChange = useCallback(e => {
        if (e.target.value === '') {
            setValidation('Username should have some value!');
        } else {
            setLastName(e.target.value);
            setValidation('');
        }
    }, [setValidation, setLastName]);

    const onDateChange = useCallback(e => {
        setBirthDate(e.target.value);
    }, []);

    const onImageChange = useCallback(e => {
        if (e.target.files && e.target.files[0])
        {
            let imageFile = e.target.files[0];
            const reader = new FileReader();
            reader.onload = x => {
                setImage({
                    imageFile,
                    imageSrc: x.target.result,
                })
            }
            reader.readAsDataURL(imageFile);
        }
        else {
            setImage({
                imageFile: null,
                imageSrc: defaultUser
            })
        }
    }, [setImage]);

    
    useEffect(() => {
        async function fetchUser() {
            const response = await requestHelper.get(serviceUrls.getUserSettings, { 
                method: 'GET',
                headers: {
                            'Content-Type': 'application/json',
                        },
                credentials: 'include'},
            isAuth, true);

            if (response) {
                console.log(response);
                setUser(response)
                setFirstName(response.firstName);
                if (response.image) {
                    setImage({
                        imageFile: null,
                        imageSrc: `data:image/jpeg;base64,${response.image}`
                    });
                }
                setBirthDate(response.birthDate);
                setLastName(response.lastName);
                setNotifications(response.shouldSendNotifications);
            }
        }

        if (!firstName) {
            fetchUser();
        }
    }, [setFirstName, setLastName, setImage, setNotifications, setUser, isAuth]);

    const onFormSubmit = useCallback(async (e) => {
        e.preventDefault();
        if (lastName !== user.lastName || firstName !== user.firstName || userImage !== user.image || notifications !== user.shouldSendNotifications) {            
            const image = userImage.imageFile ? userImage.imageFile : null;
            const userId = user.id;
            const userData = {
                userId,
                firstName,
                lastName,
                shouldSendNotifications: notifications,
                birthDate,
                image
            };
                
            const formData = new FormData();
            for (const key in userData) {
                formData.append(key, userData[key]);
            };
                        
            console.log(userData);
            
            const response = await requestHelper.get(
                serviceUrls.updateUserSettings,
                {
                    method: 'POST',
                    body: formData
                });
        }
        else {
            e.preventDefault();
        }
    }, [firstName, lastName, userImage, notifications]);

    if (!isAuth) {
        return <BasePage />   
    }
        
    return (
        <div className="user-account__page-container">
            <BasePage>
                <PageName title={'My account'} />
                <section className='user-account__container'>
                    <form className='user-account__form' id='form' onSubmit={onFormSubmit}>
                        <div className='user-account__form-fields'>
                            <div className='user-account__image-form-field'>
                                <div className='user-account__image-container'><img src={userImage.imageSrc} className='user-account__image' /></div>
                                <div className='user-account__image-input'>
                                    <input type={'file'} id='file-upload' name='photo' onChange={onImageChange} />
                                    <label htmlFor='file-upload'>upload new photo</label>
                                </div>
                            </div>
                            <div className='user-account-form__info-fields'>
                                <div className='user-account-form__info-field-column'>
                                    <Input
                                        type={'text'}
                                        value={firstName}
                                        label={'First Name'}
                                        name='firstname'
                                        placeholder={'Enter first name...'}
                                        onChange={onFirstNameChange}
                                        withBorder
                                    />
                                    <Input
                                        type={'text'}
                                        value={lastName}
                                        label={'Last Name'}
                                        name='lastname'
                                        placeholder={'Enter last name...'}
                                        onChange={onLastNameChange}
                                        withBorder
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
                                    {/* <Input type={'date'} placeholder={'birth day'} lang={'en-UK'} onChange={onDateChange}  withBorder /> */}
                                    <input
                                        type={'checkbox'}
                                        className='checkbox-input'
                                        id='checkbox'
                                        name='checkbox'
                                        checked={notifications}
                                        onChange={onNotificationsChange}
                                    />
                                    <label htmlFor='checkbox' className='checkbox-label'>
                                        <span className='checkbox'></span>
                                        send notifications
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className='submit-button__container'>
                            <input type='submit' value={'save changes'} className='submit-button' />
                        </div>
                    </form>
                </section>
            </BasePage>
        </div>
    )
}

export default UserAccount;