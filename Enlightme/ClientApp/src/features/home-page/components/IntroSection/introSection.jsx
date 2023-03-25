import React from "react";
import BookAdviseSection from "../BookAdviseSection/bookAdviseSection";
import PagesMenu from "features/common/components/PagesMenu/pagesMenu";

import './introSection.scss';

export default function IntroSection() {
    return (
        <section className='intro-section__container'>
            <PagesMenu />
            <BookAdviseSection />
        </section>
    )
}