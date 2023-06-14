import React, {useCallback, useState} from "react";
import { Navigate } from 'react-router-dom';

import BasePage from "src/components/base/BasePage/basePage";
import Input from 'components/base/Input/input';
import PageName from 'src/features/common/components/PageName/pageName';
import PagesMenu from "features/common/components/PagesMenu/pagesMenu";
import requestHelper from "src/helpers/requestHelper";
import serviceUrls from "src/constants/serviceUrls";
import routes from "src/constants/routes";
import defaultImg from "src/static/images/defaultImage.png"

import './signUpPage.scss';

const defaultImage = {
    imageSrc: defaultImg,
    imageFile: null
};

export default function SignUpPage() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [image, setImage] = useState(defaultImage);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [register, setRegister] = useState(false);
    const [warning, setWarning] = useState({
        email: [],
        password: [],
        username: [],
        birthDate: [],
    });

    const onFirstNameChange = useCallback(e => {
        setFirstName(e.target.value);
    }, []);

    const onLastNameChange = useCallback(e => {
        setLastName(e.target.value);
    }, []);

    const onEmailChange = useCallback(e => {
        setWarning({...warning, email: []})
        setEmail(e.target.value);
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
                imageSrc: defaultImg
            })
        }
    }, []);

    const onDateChange = useCallback(e => {
        setWarning({...warning, birthDate: []})
        setBirthDate(e.target.value);
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
            setWarning('');
            const userImage = image.imageFile;
            const user = {
                firstName,
                lastName,
                password,
                email,
                image: userImage,
                birthDate
            };

            const formData = new FormData();
            for (const key in user) {
                formData.append(key, user[key]);
            }

            const response = await requestHelper.get(serviceUrls.registration, {
                method: 'POST',
                body: formData
            });

            if (response) {
                setRegister(true);
            }
        } else {
            setWarning(
                {...warning, password: ['Passwords differ one from another']}
            );
        }
    }, [birthDate, repeatPassword, email, image, lastName, password]);

    if (register) {
        return <Navigate to={routes.LOG_IN} />;
    }

    return (
        <div className="page-container">
            <BasePage isLoginPage>
                <PageName title={'Sign Up'} />
                <section className="sign-up-page__section">
                    <form className="sign-up-page__form" onSubmit={onFormSubmit}>
                        <div className="sign-up-page__form-fields">
                            <div className="sign-up-page__form-column">
                                <Input type={'text'} placeholder={'first name'} onChange={onFirstNameChange} withBorder />
                                <p className="" style={{width: 200}}>{warning.username}</p>
                                <Input type={'date'} placeholder={'birth day'} lang={'en-UK'} onChange={onDateChange}  withBorder />
                                <p className="" style={{width: 200}}>{warning.birthDate}</p>
                                <Input type={'password'} placeholder={'password'} onChange={onPasswordChange} withBorder />
                                <Input type={'password'} placeholder={'repeat password'} onChange={onRepeatPasswordChange} withBorder />
                            </div>
                            <div className="sign-up-page__form-column">
                                <Input type={'text'} placeholder={'last name'} onChange={onLastNameChange} withBorder />
                                <Input type={'email'} placeholder={'email'} onChange={onEmailChange} withBorder />
                                <p className="" style={{width: 200}}>{warning.email}</p>
                                <div className="sign-up-page__photo-container">
                                    <img src={image.imageSrc} className="sign-up-page__photo"/>
                                </div>
                                <div className="sign-up-page__photo-input">
                                    <input id="sign-up-photo" type={'file'} onChange={onImageChange} />
                                    <label htmlFor="sign-up-photo">choose photo</label>
                                </div>
                            </div>
                        </div>
                        <p className="" style={{width: 400}}>{warning.password}</p>
                        <div className="sign-up-page__button-container">
                            <button type="submit" className="sign-up-page__button">Sign up</button>
                        </div>
                    </form>
                </section>
            </BasePage>
        </div>
    )
}