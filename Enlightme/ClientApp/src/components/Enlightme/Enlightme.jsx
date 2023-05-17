import React from "react";
import { BrowserRouter, Route, Routes, Switch } from 'react-router-dom';

import Home from "src/pages/Home/Home";
import UserAccount from "src/pages/UserAccountPage/userAccountPage";
import LibraryPage from "src/pages/LibraryPage/libraryPage";
import UserBooksPage from "src/pages/UserBooksPage/userBooksPage";
import AboutPage from "src/pages/AboutPage/aboutPage";
import BookInfoPage from "src/pages/BookInfoPage/bookInfoPage";
import SignUpPage from "src/pages/SignUpPage/signUpPage";
import LoginPage from "src/pages/LoginPage/loginPage";
import UserCardsPage from "src/pages/UserCardsPage/userCardsPage";
import ReadBookPage from "src/pages/ReadBookPage/readBookPage";
import Checkout from "src/components/base/Payment/Checkout";

import routes from "src/constants/routes";

const Enlightme = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={routes.HOME} element={<Home />} exact />
                <Route path={routes.ACCOUNT} element={<UserAccount />} />
                <Route path={routes.LIBRARY} element={<LibraryPage />} />
                <Route path={routes.USER_BOOKS} element={<UserBooksPage />} />
                <Route path={routes.ABOUT} element={<AboutPage />} />
                <Route path={routes.BOOK} element={<BookInfoPage />} />
                <Route path={routes.SIGN_UP} element={<SignUpPage />} />
                <Route path={routes.LOG_IN} element={<LoginPage />} />
                <Route path={routes.USER_CARDS} element={<UserCardsPage />} />
                <Route path={routes.USER_BOOK_CARDS} element={<UserCardsPage />} />
                <Route path={routes.USER_CARDS_LEARN} element={<UserCardsPage />} />
                <Route path={routes.READ_BOOK} element={<ReadBookPage />} />
                <Route exact path={routes.CHECKOUT} element={<Checkout />} />  
            </Routes>
        </BrowserRouter>
    );
};

export default Enlightme;