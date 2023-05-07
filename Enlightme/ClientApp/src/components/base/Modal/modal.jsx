import React from 'react';

import "./modal.scss";

export default function Modal({ isModalOpen, onClose, children, title }) {
    return isModalOpen && (
        <div className="modal">
          <div onClick={onClose} className="overlay"></div>
          <div className="modal-content">
            <h2 className='modal__title'>{title}</h2>
            {children}
            <button className="close-modal" onClick={onClose}>
                X
            </button>
          </div>
        </div>
    );
}