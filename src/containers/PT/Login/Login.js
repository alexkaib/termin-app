import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import LoginForm from '../../../components/PT/Login/LoginForm';

class Login extends Component {
  state = {
    email: '',
    password: '',
    errorMessage: null
  }

  inputHandler = (event) => {
    const currentState = {...this.state};
    currentState[event.target.id] = event.target.value;
    this.setState(currentState);
  }

  submitLoginHandler = () => {
    this.props.onSubmitLogin(this.state.email, this.state.password);
    const authData = {
      email: this.state.email,
      password: this.state.password,
      returnSecureToken: true
    };
    axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=', authData)
      .then(res => {
        const payload = {
          token: res.data.idToken,
          userId: res.data.localId
        };
        this.props.onAuthSuccess(payload);
        this.props.history.push('/pt/set-slot');
      })
      .catch(err => {
        console.log(err.response);
        this.props.onAuthFail(err.response.data.error.message);
        this.setState({errorMessage: err.response.data.error.message});
      })
  }

  render () {
    return (
      <LoginForm
        email={this.state.email}
        password={this.state.password}
        inputHandler={this.inputHandler}
        submitLoginHandler={this.submitLoginHandler}
        errorMessage={this.state.errorMessage}
        available={this.state.password.length > 5 && this.state.email.includes('@')}/>
    );
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmitLogin: (email, password) => dispatch({type: 'SUBMIT_LOGIN', email: email, password: password}),
    onAuthSuccess: (payload) => dispatch({type: 'AUTH_SUCCESS', token: payload.token, userId: payload.userId}),
    onAuthFail: (error) => dispatch({type: 'AUTH_FAIL', error: error})
  }
};

const mapStateToProps = (state) => {
  return {
    loginData: state.pt
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
