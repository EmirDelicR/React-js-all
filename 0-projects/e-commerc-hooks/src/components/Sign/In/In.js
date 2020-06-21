import React, { useState } from 'react';
import { connect } from 'react-redux';
import './In.scss';
import FormInput from '../../Form/Input/Input';
import FormButton from '../../Form/Button/Button';
import {
  googleSingInStart,
  emailSingInStart,
} from '../../../redux-state/user/user.actions';

const SignIn = ({ emailSingInStart, googleSingInStart }) => {
  const [userCredentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const { email, password } = userCredentials;

  const handleSubmit = async (event) => {
    event.preventDefault();

    emailSingInStart(email, password);
  };

  const handleChange = (event) => {
    const { value, name } = event.target;
    setCredentials({ ...userCredentials, [name]: value });
  };

  return (
    <div className="sign-in-wrap">
      <div className="sign-in">
        <h2>Sign in with your email and password</h2>

        <form onSubmit={handleSubmit}>
          <FormInput
            name="email"
            type="email"
            value={email}
            label="Email"
            handleChange={handleChange}
            required
          />

          <FormInput
            name="password"
            type="password"
            value={password}
            label="Password"
            handleChange={handleChange}
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
};

const mapDispatchToProps = (dispatch) => ({
  googleSingInStart: () => dispatch(googleSingInStart()),
  emailSingInStart: (email, password) =>
    dispatch(emailSingInStart({ email, password })),
});

export default connect(null, mapDispatchToProps)(SignIn);
