import React, { useEffect, lazy, Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './App.css';

import { selectCurrentUser } from '../../redux-state/user/user.selectors';
import { checkUserSession } from '../../redux-state/user/user.actions';

import Header from '../../components/Header/Header.container';
const HomePage = lazy(() => import('../Home/HomePage'));
const ShopPage = lazy(() => import('../Shop/ShopPage'));
const CheckoutPage = lazy(() => import('../Checkout/CheckoutPage'));
// import CollectionPage from '../Collection/CollectionPage';

const SignIn = lazy(() => import('../../components/Sign/In/In'));
const SignUp = lazy(() => import('../../components/Sign/Up/Up'));

const App = ({ checkUserSession, currentUser }) => {
  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);

  return (
    <div className="App">
      <Suspense fallback={<div>...Loading</div>}>
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
      </Suspense>
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
