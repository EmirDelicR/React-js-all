import React, { useState } from 'react';
import { connect } from 'react-redux';
import './Up.scss';

import { EMPTY_USER_DATA } from '../../../utility/constants';
import { signUpStart } from '../../../redux-state/user/user.actions';

import FormInput from '../../Form/Input/Input';
import FormButton from '../../Form/Button/Button';

const SignUp = ({ signUpStart }) => {
  const [userData, setUserData] = useState(EMPTY_USER_DATA);
  const { displayName, email, password, confirmPassword } = userData;

  const handleSubmit = async (event) => {
    event.preventDefault();
    signUpStart({ displayName, email, password });
  };

  const handleChange = (event) => {
    const { value, name } = event.target;
    setUserData({ ...userData, [name]: value });
  };

  return (
    <div className="sign-up-wrap">
      <div className="sign-up">
        <h2>Create an account</h2>

        <form onSubmit={handleSubmit}>
          <FormInput
            name="displayName"
            type="text"
            value={displayName}
            label="Display Name"
            handleChange={handleChange}
            required
          />

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

          <FormInput
            name="confirmPassword"
            type="password"
            value={confirmPassword}
            label="Confirm Password"
            handleChange={handleChange}
            required
          />

          <div className="button-wrap">
            <FormButton type="submit">Sign Up</FormButton>
          </div>
        </form>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  signUpStart: (userCredentials) => dispatch(signUpStart(userCredentials)),
});
export default connect(null, mapDispatchToProps)(SignUp);
