import React, {Component} from 'react';
import { Route } from 'react-router-dom';

import AuxComp from '../../hoc/AuxComp/AuxComp';
import Login from './Login/Login';
import SlotSetter from './SlotSetter/SlotSetter';

class PT extends Component {
  state = {
    name: ''
  }

  render () {
    return (
      <AuxComp>
        <Route path='/pt' exact component={Login} />
        <Route path='/pt/set-slot' component={SlotSetter} />
      </AuxComp>
    );
  }
};

export default PT;
