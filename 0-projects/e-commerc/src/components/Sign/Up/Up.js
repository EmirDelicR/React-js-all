import React, { Component } from 'react';
import './Up.scss';

import { auth, createUserProfileDocument } from '../../../firebase/utils';
import { EMPTY_USER_DATA } from '../../../utility/constants';

import FormInput from '../../Form/Input/Input';
import FormButton from '../../Form/Button/Button';

class SignUp extends Component {
  constructor() {
    super();
    this.state = EMPTY_USER_DATA;
  }

  handleSubmit = async event => {
    event.preventDefault();

    const { displayName, email, password, confirmPassword } = this.state;

    /** TODO make validation here for fields in utility/validation.js */

    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );

      await createUserProfileDocument(user, { displayName });

      this.setState(EMPTY_USER_DATA);
    } catch (error) {
      console.log(`Sign up user fail: ${error.message}`);
    }
  };

  handleChange = event => {
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

export default SignUp;
