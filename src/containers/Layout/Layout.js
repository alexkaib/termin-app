import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import AuxComp from '../../hoc/AuxComp/AuxComp';
import Toolbar from '../../components/UI/Toolbar/Toolbar';
import Landing from '../Landing/Landing';
import RS from '../RS/RS';
import SlotSetter from '../PT/SlotSetter/SlotSetter';
import styles from './Layout.module.css';

class Layout extends Component {
  render() {
    return (
      <AuxComp>
        <Toolbar />
        <main className={styles.MainContainer}>
          <Route path="/" exact component={RS} />
          <Route path="/rs" component={RS} />
          <Route path="/set-slot" component={SlotSetter} />
        </main>
      </AuxComp>
    );
  }
};

export default Layout;
