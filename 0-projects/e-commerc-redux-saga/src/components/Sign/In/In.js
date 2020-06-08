import React, { Component } from 'react';
import './In.scss';
import FormInput from '../../Form/Input/Input';
import FormButton from '../../Form/Button/Button';
import { auth, signInWithGoogle } from '../../../firebase/utils';

class SignIn extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: ''
    };
  }

  handleSubmit = async event => {
    event.preventDefault();
    const { email, password } = this.state;

    try {
      await auth.signInWithEmailAndPassword(email, password);
      this.setState({
        email: '',
        password: ''
      });
    } catch (error) {
      console.log(`Error in sign in: ${error.message}`);
    }
  };

  handleChange = event => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  };

  render() {
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
              <FormButton onClick={signInWithGoogle} isGoogleSignIn>
                Sign In with Google
              </FormButton>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default SignIn;
