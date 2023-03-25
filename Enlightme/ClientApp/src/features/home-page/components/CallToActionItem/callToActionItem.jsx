import React from "react";
import PropTypes from 'prop-types';

import './callToActionItem.scss';

function CallToActionItem({ image, withBackground = false }) {
    return (
        <div className="call-to-action-item">
            <img className={withBackground ? "call-to-action-item__image--colored" : "call-to-action-item__image"} src={image}></img>
        </div>
    );
}

CallToActionItem.propTypes = {
    image: PropTypes.node
}

export default CallToActionItem;