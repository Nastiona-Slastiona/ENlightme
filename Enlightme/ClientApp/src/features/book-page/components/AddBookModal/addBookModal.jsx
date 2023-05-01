import React, { useCallback } from 'react';

import Modal from 'src/components/base/Modal/modal';
import Input from 'components/base/Input/input';

import "./addBookModal.scss";

export default function AddBookModal({ isModalOpen, onClose, book }) {

    const onFieldChanged = useCallback((e) => {
        book[e.target.placeholder] = e.target.value
    }, []); 

    return <Modal title={'Add new book'} isModalOpen={isModalOpen} onClose={onClose}>
        <div>
            <div className="sign-up-page__form-column">
                <Input 
                    value={book.title} 
                    type={'text'} 
                    placeholder={'title'} 
                    label={'Title'}
                    onChange={onFieldChanged} 
                    withBorder 
                />
                <Input 
                    value={book.author}
                    type={'text'} 
                    placeholder={'author'} 
                    label={'Author'}
                    onChange={onFieldChanged}  
                    withBorder 
                />
                <Input 
                    value={book.description}
                    type={'textarea'} 
                    label={'Description'}
                    placeholder={'description'} 
                    onChange={onFieldChanged} 
                    withBorder 
                />
            </div>
            {/* <div className="sign-up-page__form-column">
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
            </div> */}
        </div>
    </Modal>;
}