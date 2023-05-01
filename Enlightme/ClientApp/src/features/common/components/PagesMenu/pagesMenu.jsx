import React from "react";

import Logo from "src/features/common/components/Logo/logo";

import './pagesMenu.scss';

export default function PagesMenu() {
    return (
        <div className="pages-menu__header">
            <div className="pages-menu-logo__container">
                <Logo />
            </div>
            <div className='pages-menu__navbar'>
                <Navbar />
            </div>
        </div>
    )
}