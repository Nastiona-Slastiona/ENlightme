import React from "react";
import CallToActionItem from "src/features/home-page/components/CallToActionItem/callToActionItem";

import reading from 'src/static/images/reading.png';
import translating from 'src/static/images/translate.png';
import thinking from 'src/static/images/thinking.png';
import notecing from 'src/static/images/notecing.png';

import './callToActionSection.scss';

export default function CallToActionSection() {
    return (
        <section className='call-to-action-section__container'>
            <div className="call-to-action-section ">
                <CallToActionItem image={reading} withBackground={true} />
                <CallToActionItem image={translating} />
                <CallToActionItem image={thinking} withBackground={true} />
                <CallToActionItem image={notecing} />
            </div>
        </section>
    );
}