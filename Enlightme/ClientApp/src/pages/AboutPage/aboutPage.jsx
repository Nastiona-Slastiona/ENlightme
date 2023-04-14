import React from "react";

import BasePage from "src/components/base/BasePage/basePage";
import Logo from "src/features/common/components/Logo/logo";
import Navbar from "src/features/home-page/components/Navbar/navbar";
import PageName from "src/features/common/components/PageName/pageName";
import CallToActionSection from "src/features/home-page/components/CallToActionSection/callToActionSection";

import './aboutPage.scss';

export default function AboutPage() {
    return (
        <BasePage>
            <PageName title={'About Us'} />
            <div className="about-page-text__container">
                <span className="about-page__text">
                    We created <b>Enlightme</b> special for you ! <br /><br />Here you can read different books. <br/><br />Create note on interesting thoughts. <br /><br />And learn new words by creating cards!
                </span>
            </div>
            <div className="about-page-call-to-action">
                <CallToActionSection />
            </div>
        </BasePage>
    )
}