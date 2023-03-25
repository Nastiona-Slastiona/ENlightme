import React, { useCallback, useState } from 'react';

import dark from 'static/images/night-mode';
import light from 'static/images/sunny'

import './themeSwitcher.scss';

export default function ThemeSwitcher() {
    const [isDarkMode, setMode] = useState(true);
    const onSwitcherClick = useCallback(() => {
        setMode(!isDarkMode);
        document.body.classList.add('theme--dark')
    }, [isDarkMode]);

    return (
        <div className='theme-switcher__container' onClick={onSwitcherClick}>
            {
                isDarkMode && (
                    <img src={dark} className='theme-switcher' />
                )
            }
            {
                !isDarkMode && (
                    <img src={light} className='theme-switcher' />
                )
            }
        </div>
    )
}