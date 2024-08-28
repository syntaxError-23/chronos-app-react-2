import React from 'react'
import ReactDom from 'react-dom'
import './modal.css'

const mountElement = document.getElementById('portal');

  
  function Modal({ open, onClose, children }) {
    if (!open) return null;
  
    return ReactDom.createPortal(
      <div className='modal-overlay'>
        <div className='modal-content'>
          <div className="modal-banner">
            <p className='px-2 py-0'>Error</p>
            <span className='close-button px-2' onClick={onClose}>x</span>
          </div>
          {children}
        </div>
      </div>,
      mountElement
    );
  }

export default Modal




