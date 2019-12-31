import React from 'react';

import logoImg from '../../assets/logo.png';
import styles from './Logo.module.css';

const logo = (props) => (
  <div className={styles.Logo}>
    <img src={logoImg} alt="App Logo" />
  </div>
);

export default logo;
