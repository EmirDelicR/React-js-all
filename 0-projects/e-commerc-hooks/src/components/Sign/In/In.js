import React, { Component } from 'react';
import { connect } from 'react-redux';
import './In.scss';
import FormInput from '../../Form/Input/Input';
import FormButton from '../../Form/Button/Button';
import {
  googleSingInStart,
  emailSingInStart,
} from '../../../redux-state/user/user.actions';

class SignIn extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const { emailSingInStart } = this.props;
    const { email, password } = this.state;
    emailSingInStart(email, password);
  };

  handleChange = (event) => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { googleSingInStart } = this.props;
    return (
      <div className="sign-in-wrap">
        <div className="sign-in">
          <h2>Sign in with your email and password</h2>

          <form onSubmit={this.handleSubmit}>
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

            <div className="button-wrap">
              <FormButton type="submit">Sign In</FormButton>
              <FormButton
                type="button"
                onClick={googleSingInStart}
                isGoogleSignIn
              >
                Sign In with Google
              </FormButton>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  googleSingInStart: () => dispatch(googleSingInStart()),
  emailSingInStart: (email, password) =>
    dispatch(emailSingInStart({ email, password })),
});

export default connect(null, mapDispatchToProps)(SignIn);
