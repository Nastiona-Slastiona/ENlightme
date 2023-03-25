import React, { useCallback, useEffect, useState, useMemo } from 'react';
import HeaderItem from 'src/features/common/components/HeaderItem/headerItem';
import ThemeSwitcher from 'src/features/common/components/ThemeSwitcher/themeSwitcher';
import UserMenu from 'src/features/common/components/UserMenu/userMenu';
import Input from 'components/base/Input/input';

import routes from 'src/constants/routes';
import search from "src/static/images/Search.png";
import cart from "src/static/images/Cart.png";
import account from "src/static/images/Account.png";
import menu from "src/static/images/menu-dark.png";
import add_user from "src/static/images/add-user.png";


import './header.scss';

const Header = ({ isLoginPage, name, image }) => {
    const [isSearchClosed, setIsSearchClosed] = useState(true);
    const [isMenuActive, setIsMenuActive] = useState(false);

    const searchItem = useMemo(() => {
        return (isSearchClosed
            ? <HeaderItem itemName="search" icon={search} />
            : <Input type='text' placeholder='search for...' />
        );
    }, [isSearchClosed]);

    const onMenuClick = useCallback(() => {
        setIsMenuActive(prevState => !prevState);
    }, [setIsMenuActive]);

    return (
        <div className='header-container'>
            <div className={isMenuActive ? 'header-menu__container header-menu__container--active' : 'header-menu__container'} onClick={onMenuClick}><img src={menu} className='header-menu' /></div>
            {
                isMenuActive && (
                    <UserMenu isActive={isMenuActive} name={name} image={image} />
                )
            }
            <nav className='header'>
                <ul className='header-main'>
                    <div onClick={() => setIsSearchClosed(false)} className='header-search'>
                        {searchItem}
                    </div>
                    {
                        !isLoginPage && (
                            <>
                                <HeaderItem itemName="account" icon={account} link={routes.ACCOUNT} />
                            </>
                        )
                    }
                    {
                        isLoginPage && (
                            <>
                                <HeaderItem itemName="Sign up" icon={add_user} link={routes.SIGN_UP} />
                            </>
                        )
                    }
                    {/* <ThemeSwitcher /> */}
                </ul>
            </nav>
        </div>
    );
}

export default Header;