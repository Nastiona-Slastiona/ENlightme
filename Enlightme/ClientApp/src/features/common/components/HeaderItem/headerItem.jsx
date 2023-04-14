import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

import "./headerItem.scss";

function HeaderItem({ link, itemName, icon, onClick }) {
    return (
        <li className='header-item__container' onClick={onClick}>
            <img className='header-item__icon' src={icon}></img>
            <Link to={link} className='header-item__title'>{itemName}</Link>
        </li>
    );
}

HeaderItem.propTypes = {
    link: PropTypes.string,
    itemName: PropTypes.string,
    onClick: PropTypes.func
}

export default HeaderItem;