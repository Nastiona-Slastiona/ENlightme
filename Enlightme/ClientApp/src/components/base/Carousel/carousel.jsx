import React, { useCallback, useEffect, useState } from "react";

import PropTypes from 'prop-types';

import "./carousel.scss";

function Carousel({ slides }) {
    const [showedItem, setShowedItem] = useState(slides[0]);

    const onPrevClick = useCallback(() => {
        const index = slides.indexOf(showedItem);
        setShowedItem(index === 0 ? slides[slides.length - 1] : slides[index - 1]);
    }, [slides, setShowedItem, showedItem]);

    const onNextClick = useCallback(() => {
        const index = slides.indexOf(showedItem);
        setShowedItem(index === slides.length - 1 ? slides[0] : slides[index + 1]);
    }, [slides, setShowedItem, showedItem]);

    useEffect(() => {
        if (showedItem === undefined && slides !== undefined) {
            setShowedItem(slides[0]);
        }
    }, [slides, setShowedItem]);

    return (
        <section className="carousel__container">
            <div className="carousel-button__container carousel-button--left "><button className="carousel-button" onClick={onPrevClick}>{'<'}</button></div>
            <div className="carousel-content">
                {showedItem}
            </div>
            <div className="carousel-button__container carousel-button--right"><button className="carousel-button" onClick={onNextClick}>{'>'}</button></div>
        </section>
    );
}

Carousel.propTypes = {
    slides: PropTypes.array
}

export default Carousel;