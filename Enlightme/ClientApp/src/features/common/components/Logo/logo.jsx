import React from "react";
import { Link } from "react-router-dom";

import routes from 'src/constants/routes';

import logo from "src/static/images/Logo.png";

import './logo.scss';

export default function Logo() {
    return (
        <div className="logo__container">
            <div className="logo">
                <Link to={routes.HOME}>
                    <img src={logo}></img>
                </Link>
            </div>
        </div>
    )
}
