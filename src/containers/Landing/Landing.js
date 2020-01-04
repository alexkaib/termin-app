import React, {Component} from 'react';
import { connect } from 'react-redux';

import AuxComp from '../../hoc/AuxComp/AuxComp';
import ConsentForm from '../../components/ConsentForm/ConsentForm';

class Landing extends Component {

  acceptTermsHandler = () => {
    this.props.history.push({pathname: '/rs/select-slot'});
  }

  componentDidMount () {
    if (this.props.termsAccepted) {
      this.props.history.push({pathname: '/rs/select-slot'});
    }
  }

  render () {

    return (
      <AuxComp>
        <ConsentForm
          inputHandler={this.props.onCheck}
          accepted={this.props.termsAccepted}
          acceptTermsHandler={this.acceptTermsHandler} />
      </AuxComp>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    termsAccepted: state.rs.termsAccepted
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCheck: () => dispatch({type: 'CHECK_TERMS'})
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
