import React, {useCallback, useState} from "react";
import { Navigate } from 'react-router-dom';

import BasePage from "src/components/base/BasePage/basePage";
import Input from 'components/base/Input/input';
import PageName from 'src/features/common/components/PageName/pageName';
import PagesMenu from "features/common/components/PagesMenu/pagesMenu";
import requestHelper from "src/helpers/requestHelper";
import serviceUrls from "src/constants/serviceUrls";
import routes from "src/constants/routes";

import './signUpPage.scss';

export default function SignUpPage() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [image, setImage] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [register, setRegister] = useState(false);
    const [warning, setWarning] = useState({
        email: [],
        password: [],
        username: [],
        date_of_birth: [],
    });

    const onFirstNameChange = useCallback(e => {
        setFirstName(e.target.value);
    }, []);

    const onLastNameChange = useCallback(e => {
        setLastName(e.target.value);
    }, []);

    const onUsernameChange = useCallback(e => {
        setWarning({...warning, username: []})
        setUsername(e.target.value);
    }, []);

    const onEmailChange = useCallback(e => {
        setWarning({...warning, email: []})
        setEmail(e.target.value);
    }, []);

    const onImageChange = useCallback(e => {
        setImage(e.target.files[0]);
    }, []);

    const onDateChange = useCallback(e => {
        console.log(warning)
        setWarning({...warning, date_of_birth: []})
        setDateOfBirth(e.target.value);
    }, []);

    const onPasswordChange = useCallback(e => {
        setWarning({...warning, password: []})
        setPassword(e.target.value);
    }, []);

    const onRepeatPasswordChange = useCallback(e => {
        setRepeatPassword(e.target.value);
        setWarning({
            ...warning, password: [
                e.target.value !== password
                ? 'You entered two different passwords. Please try again.'
                : ''
            ]
        });
    }, [password]);

    const onFormSubmit = useCallback(async e => {
        e.preventDefault();
        if (repeatPassword === password) {
            const userData = {
                first_name: firstName, last_name: lastName, username,
                email, password, password2: repeatPassword,
                photo: image, date_of_birth: dateOfBirth,
            };

            const formData = new FormData();
            Object.keys(userData).forEach(key => formData.append(key, userData[key]))

            await requestHelper.get(serviceUrls.signUp, {
                method: 'POST',
                body: formData
            }).then(
            (result) => {
                setRegister(true);
                return result;
            },
            (error) => {
                setWarning({...warning, ...JSON.parse(error.message)});
              })
        } else {
            setWarning(
                {...warning, password: ['Passwords differ one from another']}
            );
        }
    }, [dateOfBirth, repeatPassword, email, image, lastName, password]);

    if (register) {
        return <Navigate to={routes.LOG_IN} />;
    }

    return (
        <BasePage>
            <PagesMenu />
            <PageName title={'Sign Up'} />
            <section className="sign-up-page__section">
                <form className="sign-up-page__form" onSubmit={onFormSubmit}>
                    <div className="sign-up-page__form-fields">
                        <div className="sign-up-page__form-column">
                            <Input type={'text'} placeholder={'first name'} onChange={onFirstNameChange} />
                            <Input type={'text'} placeholder={'username'} onChange={onUsernameChange} />
                            <p className="" style={{width: 200}}>{warning.username}</p>
                            <Input type={'date'} placeholder={'birth day'} lang={'en-UK'} onChange={onDateChange} />
                            <p className="" style={{width: 200}}>{warning.date_of_birth}</p>
                            <Input type={'password'} placeholder={'password'} onChange={onPasswordChange} />
                        </div>
                        <div className="sign-up-page__form-column">
                            <Input type={'text'} placeholder={'last name'} onChange={onLastNameChange} />
                            <Input type={'email'} placeholder={'email'} onChange={onEmailChange} />
                            <p className="" style={{width: 200}}>{warning.email}</p>
                            <div className="sign-up-page__photo">
                                <input id="sign-up-photo" type={'file'} className="sign-up-page__photo-input" onChange={onImageChange} />
                                <label htmlFor="sign-up-photo">choose photo</label>
                            </div>
                            <Input type={'password'} placeholder={'repeat password'} onChange={onRepeatPasswordChange} />
                        </div>
                    </div>
                    <p className="" style={{width: 400}}>{warning.password}</p>
                    <div className="sign-up-page__button-container">
                        <button type="submit" className="sign-up-page__button">Sign up</button>
                    </div>
                </form>
            </section>
        </BasePage>
    )
}