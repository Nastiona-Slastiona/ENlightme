import React from "react";

import './notifications.scss';
import { Link } from "react-router-dom";
import routes from "src/constants/routes";
import classNames from "classnames";

const Notifications = ({ notifications, icon, darkMode=false }) => {
    const notificationsClassName = classNames('notifications-value', { 'notifications-value--dark': darkMode });

    return (
        <Link to={routes.USER_CARDS} className='notifications-link'>
            <img className='notifications' src={icon} />
            <span className={notificationsClassName} key={0}>{notifications}</span>
        </Link>
    )
}

export default Notifications;