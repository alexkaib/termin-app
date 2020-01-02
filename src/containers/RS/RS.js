import React, {Component} from 'react';
import { Route } from 'react-router-dom';

import AuxComp from '../../hoc/AuxComp/AuxComp';
import Landing from '../Landing/Landing';
import SlotSelector from './SlotSelector/SlotSelector';
import SlotSubmitter from './SlotSubmitter/SlotSubmitter';

class RS extends Component {
  state = {
    termsAccepted: false,
    date: null,
    ptName:null
  }

  render () {
    return (
      <AuxComp>
        <Route path='/' exact component={Landing} />
        <Route path='/rs/select-slot' component={SlotSelector} />
        <Route path='/rs/submit-slot' component={SlotSubmitter} />
      </AuxComp>
    );
  }
};

export default RS;
