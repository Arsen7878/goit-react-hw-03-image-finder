import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import c from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  static propTypes = {
    onCloseModal: PropTypes.func.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onCloseModal();
    }
  };

  handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      this.props.onCloseModal();
    }
  };

  render() {
    const { largeImageURL } = this.props;

    return createPortal(
      <div className={c.Overlay} onClick={this.handleBackdropClick}>
        <div className={c.Modal}>
          <img src={largeImageURL} alt="" />
        </div>
      </div>,
      modalRoot,
    );
  }
}

export default Modal;
