import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Up.scss';

import { EMPTY_USER_DATA } from '../../../utility/constants';
import { signUpStart } from '../../../redux-state/user/user.actions';

import FormInput from '../../Form/Input/Input';
import FormButton from '../../Form/Button/Button';

class SignUp extends Component {
  constructor() {
    super();
    this.state = EMPTY_USER_DATA;
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const { signUpStart } = this.props;
    const { displayName, email, password, confirmPassword } = this.state;
    signUpStart({ displayName, email, password });
  };

  handleChange = (event) => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className="sign-up-wrap">
        <div className="sign-up">
          <h2>Create an account</h2>

          <form onSubmit={this.handleSubmit}>
            <FormInput
              name="displayName"
              type="text"
              value={this.state.displayName}
              label="Display Name"
              handleChange={this.handleChange}
              required
            />

            <FormInput
              name="email"
              type="email"
              value={this.state.email}
              label="Email"
              handleChange={this.handleChange}
              required
            />

            <FormInput
              name="password"
              type="password"
              value={this.state.password}
              label="Password"
              handleChange={this.handleChange}
              required
            />

            <FormInput
              name="confirmPassword"
              type="password"
              value={this.state.confirmPassword}
              label="Confirm Password"
              handleChange={this.handleChange}
              required
            />

            <div className="button-wrap">
              <FormButton type="submit">Sign Up</FormButton>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  signUpStart: (userCredentials) => dispatch(signUpStart(userCredentials)),
});
export default connect(null, mapDispatchToProps)(SignUp);
