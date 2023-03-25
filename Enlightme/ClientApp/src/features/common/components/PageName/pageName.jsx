import React from 'react';

import './pageName.scss';

export default function PageName({ title }) {
    return (
        <h1 className='page-name__container'>
            <span className='page-name'>
                {title}
            </span>
        </h1>
    )
}