import React from 'react';

import NavItems from '../NavItems/NavItems';
import Logo from '../../Logo/Logo';
import styles from './Toolbar.module.css';

const toolbar = props => {
  return (
    <div className={styles.Toolbar}>
      <Logo />
      <NavItems />
    </div>
  )
};

export default toolbar;
