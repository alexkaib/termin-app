import React, {Component} from 'react';

import AuxComp from '../../hoc/AuxComp/AuxComp';
import ConsentForm from '../../components/ConsentForm/ConsentForm';

class Landing extends Component {
  render () {

    return (
      <AuxComp>
        <ConsentForm />
      </AuxComp>
    );
  }
}

export default Landing;
