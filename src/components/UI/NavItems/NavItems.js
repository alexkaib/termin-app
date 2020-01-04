import React from 'react';
import { Link } from 'react-router-dom';

import AuxComp from '../../../hoc/AuxComp/AuxComp';
import styles from './NavItems.module.css';

const locations = [
  {navName: 'Home', navLocation: '/'},
  {navName: 'Login', navLocation: '/pt'},
  {navName: 'Settings', navLocation: '/settings'}
];

const navItems = props => {
   //nned some conditional navitems based on auth, auth?locations.append() should work
  const navItemList = locations.map(location => (
      <li key={location.navName} className={styles.NavItem}>
        <Link to={{pathname: location.navLocation}}>{location.navName}</Link>
      </li>
    ));

  return (
    <AuxComp>
      {navItemList}
    </AuxComp>
  )
};

export default navItems;
