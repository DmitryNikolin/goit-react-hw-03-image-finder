import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Modal.module.css';

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdpropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    const { url, alt } = this.props;
    return (
      <div className={styles.Overlay} onClick={this.handleBackdpropClick}>
        <div className={styles.Modal}>
          <img src={url} alt={alt} />
          <button
            className={styles.CloseBtn}
            onClick={this.handleBackdpropClick}
          >
            ⛌
          </button>
        </div>
      </div>
    );
  }
}

export default Modal;

Modal.propTypes = {
  url: PropTypes.string,
  alt: PropTypes.string,
  handleBackdpropClick: PropTypes.func,
};
