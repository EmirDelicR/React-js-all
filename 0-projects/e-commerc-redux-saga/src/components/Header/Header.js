import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCartHiddenStatus } from '../../redux-state/cart/cart.selectors';
import { selectCurrentUser } from '../../redux-state/user/user.selectors';

import './Header.scss';

import { auth } from '../../firebase/utils';

import Icon from '../Cart/Icon/Icon';
import Dropdown from '../Cart/Dropdown/Dropdown';
import { ReactComponent as Logo } from '../../assets/crown.svg';

const Header = ({ currentUser, isCartHidden }) => (
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
        <div className="option" onClick={() => auth.signOut()}>
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
  isCartHidden: selectCartHiddenStatus
});

export default connect(mapStateToProps)(Header);
