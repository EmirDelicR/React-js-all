import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './App.css';

import { selectCurrentUser } from '../../redux-state/user/user.selectors';
import { checkUserSession } from '../../redux-state/user/user.actions';

import HomePage from '../Home/HomePage';
import ShopPage from '../Shop/ShopPage';
import CheckoutPage from '../Checkout/CheckoutPage';
// import CollectionPage from '../Collection/CollectionPage';

import Header from '../../components/Header/Header';
import SignIn from '../../components/Sign/In/In';
import SignUp from '../../components/Sign/Up/Up';

const App = ({ checkUserSession, currentUser }) => {
  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);

  return (
    <div className="App">
      <Header />
      <Switch>
        <Route
          path="/sign-in"
          render={() => (currentUser ? <Redirect to="/" /> : <SignIn />)}
        />
        <Route
          path="/sign-up"
          render={() => (currentUser ? <Redirect to="/" /> : <SignUp />)}
        />
        <Route exact path="/checkout" component={CheckoutPage} />
        {/* <Route path={`/shop/:collectionId`} component={CollectionPage} /> */}
        <Route exact path="/shop" component={ShopPage} />
        <Route exact path="/" component={HomePage} />
      </Switch>
    </div>
  );
};

/** Redux state to prop map */
const mapStateToProps = (state) => ({
  currentUser: selectCurrentUser(state),
});

const mapDispatchToProps = (dispatch) => ({
  checkUserSession: () => dispatch(checkUserSession()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
