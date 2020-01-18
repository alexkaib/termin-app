import React, { Component } from 'react';

import AuxComp from '../../../hoc/AuxComp/AuxComp';
import Backdrop from '../Backdrop/Backdrop';

import styles from './Modal.module.css';

class Modal extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.visible !== this.props.visible || nextProps.children !== this.props.children;
  }

  render() {
    return (
      <AuxComp>
        <Backdrop visible={this.props.visible} onBackdropClick={this.props.onBackdropClick} />
        <div className={styles.Modal} style={{
          transform: this.props.visible ? 'translateY(0)':'translateY(-100vh)',
          opacity: this.props.visible ? '1': '0'
        }}>
          {this.props.children}
        </div>
      </AuxComp>
    );
  }
};

export default Modal;
