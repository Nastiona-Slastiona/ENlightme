import React, { useCallback, useMemo } from "react";
import { Link, NavLink } from "react-router-dom";

import routes from 'src/constants/routes';

import './navbar.scss';

export default function Navbar() {
    const itemClassName = useCallback(({ isActive }) => isActive ? "navbar__item navbar__item--active" : "navbar__item", []);


    return (
        <ul className='navbar'>
            <li><NavLink to={routes.HOME} className={itemClassName}>Home</NavLink></li>
            <li><NavLink to={routes.LIBRARY} className={itemClassName}>Library</NavLink></li>
            <li><NavLink to={routes.ABOUT} className={itemClassName}>About</NavLink></li>
        </ul>
    );
}