import React, { useCallback } from 'react';

import './input.scss';

export default function Input({
    value,
    placeholder,
    type,
    label,
    lang,
    name,
    onChange,
}) {

    return (
        <div className='input__container'>
            {
                label && (
                    <label className='input-label'>{label}</label>
                )
            }
            <input
                type={type}
                defaultValue={value}
                placeholder={placeholder}
                className='input'
                onChange={onChange}
                lang={lang}
                name={name}
            />
        </div>
    )
}