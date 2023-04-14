import classNames from 'classnames';
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
    withBorder
}) {
    const inputClassName = classNames('input', { 'input--bordered' : withBorder });

    return (
        <div className='input__container' >
            {
                label && (
                    <label className='input-label'>{label}</label>
                )
            }
            <input
                type={type}
                defaultValue={value}
                placeholder={placeholder}
                className={inputClassName}
                onChange={onChange}
                lang={lang}
                name={name}
            />
        </div>
    )
}