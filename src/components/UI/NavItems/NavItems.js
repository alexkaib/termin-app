import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import AuxComp from '../../../hoc/AuxComp/AuxComp';
import styles from './NavItems.module.css';

let locations = [
  {navName: 'Home', navLocation: '/'},
  {navName: 'Login', navLocation: '/pt'}
];

const ptLocations = [
  {navName: 'Home', navLocation: '/'},
  {navName: 'Login', navLocation: '/pt'},
  {navName: 'Terminwahl', navLocation: '/pt/set-slot'},
  {navName: 'Meine Termine', navLocation: '/pt/my-slots'}
];

const navItems = props => {
  if (props.loggedIn) {
    locations = ptLocations;
  }
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

const mapStateToProps = (state) => {
  return {
    loggedIn: state.pt.loggedIn
  }
}

export default connect(mapStateToProps)(navItems);
