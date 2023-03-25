import React, {useMemo, useState} from "react";
import {Link} from "react-router-dom";

import BasePage from "src/components/base/BasePage/basePage";
import PageName from 'src/features/common/components/PageName/pageName';
import repeat from 'src/static/images/repeat.png';
import routes from "src/constants/routes";

import './userNotificationsPage.scss';
import {useDispatch, useSelector} from "react-redux";
import urlHelper from "src/helpers/urlHelper";
import serviceUrls from "src/constants/serviceUrls";
import requestHelper from "src/helpers/requestHelper";


export default function UserNotificationsPage() {
    const dispatch = useDispatch();
    const [notifications, setNotifications] = useState([]);

    useMemo(() => {
        dispatch(async () => {
            const url = urlHelper.getUrlByTemplate(
                serviceUrls.getNotifications,
            );
            const data = await requestHelper.get(
                url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }, true
            );
            setNotifications(data);
        })
    }, [dispatch]);

    if (notifications) {
        const notificationItems = notifications.map((n, ind) => {
            return (
                <div className='notification__container' key={n.id}>
                    <div className='notification-icon'><img src={repeat}/></div>
                    <Link to={routes.USER_CARDS} className='notification'>
                        <span>Repeat word</span><br/>
                        <p className='notification-message'>{n.text}</p>
                    </Link>
                </div>
            )
        })

        return (
            <BasePage needAccess={true}>
                <PageName title={'Notifications'}/>
                <section className='notification-list'>
                    {notificationItems}
                </section>
            </BasePage>
        )
    }
}