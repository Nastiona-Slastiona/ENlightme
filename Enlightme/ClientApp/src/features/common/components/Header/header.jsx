import React, { useCallback, useState } from 'react';
import HeaderItem from 'src/features/common/components/HeaderItem/headerItem';
import UserMenu from 'src/features/common/components/UserMenu/userMenu';

import classNames from 'classnames';
import routes from 'src/constants/routes';
import about from "src/static/images/about.png";
import home from "src/static/images/home.png";
import menu from "src/static/images/menu-dark.png";
import add_user from "src/static/images/add-user.png";


import './header.scss';

const Header = ({ name }) => {
    const [isMenuActive, setIsMenuActive] = useState(false);

    const onMenuClick = useCallback(() => {
        setIsMenuActive(prevState => !prevState);
    }, [setIsMenuActive]);

    const menuClassName = classNames('header-menu__container', {
        'header-menu__container--active': isMenuActive
    })

    return (
        <div className='header-container'>
            <div className={menuClassName} onClick={onMenuClick}>
                <img src={menu} className='header-menu' />
            </div>
            {
                isMenuActive && (
                    <UserMenu 
                        isActive={isMenuActive}
                        name={name}
                        setIsActive={setIsMenuActive} 
                    />
                )
            }
            <nav className='header'>
                <ul className='header-main'>
                    <HeaderItem itemName="Home" icon={home} link={routes.HOME} />
                    <HeaderItem itemName="About us" icon={about} link={routes.ABOUT} />
                    {
                        !name 
                            ? <HeaderItem itemName="Sign in" icon={add_user} link={routes.LOG_IN} />
                            : <div>Hi, {name}</div>
                    }
                </ul>
            </nav>
        </div>
    );
}

export default Header;