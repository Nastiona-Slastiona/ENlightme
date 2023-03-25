import React from 'react';
import PropTypes from 'prop-types';

import "./footer.scss";

function Footer({ mode }) {
    const classNames = require('classnames');
    const containerClassNames = classNames(
        'footer',
        {
            'footer--light': mode === 'Light',
            'footer--dark': mode === 'Dark'
        }
    )

    return (
        <footer className='footer__container'>
            <div className={containerClassNames}>
                <span className='footer-inner'>
                    © Readoom, 2022
                </span>
            </div>
        </footer>
    );
}

Footer.propTypes = {
    mode: PropTypes.string
}

export default Footer;