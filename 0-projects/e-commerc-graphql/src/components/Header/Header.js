import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux-state/user/user.selectors';
import { signOutStart } from '../../redux-state/user/user.actions';

import './Header.scss';

import Icon from '../Cart/Icon/Icon.container';
import Dropdown from '../Cart/Dropdown/Dropdown.container';
import { ReactComponent as Logo } from '../../assets/crown.svg';

const Header = ({ currentUser, isCartHidden, signOutStart }) => (
  <div className="header">
    <Link className="logo-container" to="/">
      <Logo className="Logo" />
    </Link>

    {/* This can be nav */}
    <div className="options-container">
      <Link className="option" to="/shop">
        SHOP
      </Link>
      <Link className="option" to="/shop">
        CONTACT
      </Link>

      {currentUser ? (
        <div className="option" onClick={signOutStart}>
          SIGN OUT
        </div>
      ) : (
        <div>
          <Link className="option" to="/sign-in">
            SIGN IN
          </Link>
          <Link className="option" to="/sign-up">
            SIGN UP
          </Link>
        </div>
      )}
      <Icon />
    </div>
    {isCartHidden ? null : <Dropdown />}
  </div>
);

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  signOutStart: () => dispatch(signOutStart()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Header);
