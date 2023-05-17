import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import fetchCommonInfo from "src/store/books/thunks/commonInfoThunk";

import './languageFilter.scss';


export default function LanguageFilter({ onItemSelect, initialValue = 0 }) {
    const dispatch = useDispatch()
    const languages = useSelector(state => state.books.languages);
    const [selectLang, setSelectLang] = useState(false);

    useEffect(() => {
        if (languages.length === 0) {
            dispatch(fetchCommonInfo());
        }
    }, [dispatch]);

    const languagesList = [{ id: 0, languageName: 'All' }, ...languages];

    const onSelected = useCallback((e) => {
        setSelectLang(false);
        onItemSelect(e.target.value);
    }, [onItemSelect, setSelectLang]);

    const languageSelector = languagesList.map((val, ind) => {
        return (
            <option value={val.id} key={ind} id={val.id}>{val.languageName}</option>
        )
    });

    const onSeletLangButtonClick = useCallback(() => {
        setSelectLang(true)
    }, []);

    return (
        <div className='language-filter-field'>
            {
                selectLang 
                    ? <select id='languages' className='filter' value={initialValue} onChange={onSelected}>
                        {languageSelector}
                    </select>
                    : <button className='user_cards__card-button' onClick={onSeletLangButtonClick}>select language</button>
            }            
        </div>
    );
}