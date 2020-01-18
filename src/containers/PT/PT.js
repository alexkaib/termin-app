import React, {Component} from 'react';
import { Route } from 'react-router-dom';

import AuxComp from '../../hoc/AuxComp/AuxComp';
import Login from './Login/Login';
import SlotSetter from './SlotSetter/SlotSetter';
import Calendar from './Calendar/Calendar';

class PT extends Component {
  state = {
    name: ''
  }

  render () {
    return (
      <AuxComp>
        <Route path='/pt' exact component={Login} />
        <Route path='/pt/set-slot' component={SlotSetter} />
        <Route path='/pt/my-slots' component={Calendar} />
      </AuxComp>
    );
  }
};

export default PT;
