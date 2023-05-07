import React, { useCallback, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

import Modal from 'src/components/base/Modal/modal';
import Input from 'components/base/Input/input';

import "./addBookModal.scss";

export default function AddBookModal({ isModalOpen, onClose, onSaveClick, book }) {
    const genres = useSelector(state => state.books.genres);
    const languages = useSelector(state => state.books.languages);
    const genresList = genres.filter(g => g.id !== 1);
    const [addedBook, setAddedBook] = useState(book);
    const [selectedValue, setSelectedValue] = useState(1);
    const [selectedLanguage, setSelectedLanguage] = useState(book.language.id);

    genresList.push({ type: 'None', id: 1 });

    const onFieldChanged = useCallback((e) => {
        book[e.target.placeholder] = e.target.value;
        setAddedBook(book);
    }, [setAddedBook]); 

    const onGenreChanged = useCallback((e) => {
        setAddedBook({ ...addedBook, genre: +e.target.value })
        setSelectedValue(e.target.value);
    }, [setSelectedValue, setAddedBook, addedBook]); 

    const onLanguageChanged = useCallback((e) => {
        setAddedBook({...addedBook, language: +e.target.value })
        setSelectedLanguage(e.target.value);
    }, [setSelectedLanguage, setAddedBook, addedBook]); 

    const genresItems = useMemo(() => {
        return (
            <div className='add-book__genre'>
                <label className='add-book__label'>Genre</label>
                <select id='genres' className='select-genre' name='genre' value={selectedValue} onChange={onGenreChanged}>
                    {
                        genresList.map((g, key) => <option key={key} label={g.type} onInput={onGenreChanged} value={g.id} className='select-language__option'>{g.type}</option>)
                    }
                </select>
            </div>
        );
    }, [genres, selectedValue, onGenreChanged]);

    const languagesItems = useMemo(() => {
        return (
            <div className='add-book__genre'>
                <label className='add-book__label'>Language</label>
                <select id='languages' className='select-genre' name='language' value={selectedLanguage} onChange={onLanguageChanged}>
                    {
                        languages.map((l, key) => <option key={key} label={l.languageName} onInput={onLanguageChanged} value={l.id} className='select-language__option'>{l.languageName}</option>)
                    }
                </select>
            </div>
        );
    }, [languages, selectedLanguage, onLanguageChanged]);

    const onClick = useCallback(() => {
        onSaveClick(addedBook);
    }, [addedBook]);

    return <Modal title={'Add new book'} isModalOpen={isModalOpen} onClose={onClose}>
        <div className='add-book__form-container'>
            <div className='add-book__form'>
                <div className="add-book__form-column">
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
                    <label className='add-book__label'>Description</label>
                    <textarea
                        defaultValue={book.description}
                        type={'textarea'} 
                        label={'Description'}
                        placeholder={'description'} 
                        className='add-book__description'
                        onChange={onFieldChanged} 
                    />
                </div>
                <div className="add-book__form-column">
                    {genresItems}
                    {languagesItems}
                </div>
            </div>
            <div className='add-book__buttons'>
                <button className='add-book__button' onClick={onClick}>add</button>
                <button className='add-book__button' onClick={onClose}>cancel</button>
            </div>
        </div>
    </Modal>;
}