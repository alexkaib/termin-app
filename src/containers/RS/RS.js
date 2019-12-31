import React, {Component} from 'react';
import { Route } from 'react-router-dom';

import AuxComp from '../../hoc/AuxComp/AuxComp';
import ConsentForm from '../../components/ConsentForm/ConsentForm';
import SlotSelector from './SlotSelector/SlotSelector';
import SlotSubmitter from './SlotSubmitter/SlotSubmitter';

class RS extends Component {
  state = {
    termsAccepted: false,
    date: null,
    ptName:null
  }

  termsCheckboxHandler = (event) => {
    const currentState = {...this.state};
    currentState.termsAccepted = !currentState.termsAccepted;
    this.setState(currentState);
  }

  acceptTermsHandler = () => {
    this.props.history.push({pathname: '/rs/select-slot'});
  }

  render () {
    return (
      <AuxComp>
        <Route path='/' exact render={(props) => <ConsentForm acceptTermsHandler={this.acceptTermsHandler} inputHandler={this.termsCheckboxHandler} accepted={this.state.termsAccepted} />} />
        <Route path='/rs/select-slot' render={(props) => <SlotSelector termsAccepted={this.state.termsAccepted} history={this.props.history} />} />
        <Route path='/rs/submit-slot/:dateAndTime' component={SlotSubmitter} />
      </AuxComp>
    );
  }
};

export default RS;
