import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import "./App.css";

import { auth, createUserProfileDocument } from "../../firebase/utils";
import { selectCurrentUser } from "../../redux-state/user/user.selectors";

import HomePage from "../Home/HomePage";
import ShopPage from "../Shop/ShopPage";
import CheckoutPage from "../Checkout/CheckoutPage";
import CollectionPage from "../Collection/CollectionPage";

import Header from "../../components/Header/Header";
import SignIn from "../../components/Sign/In/In";
import SignUp from "../../components/Sign/Up/Up";

import { setCurrentUser } from "../../redux-state/user/user.actions";

class App extends Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUserProp } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (!userAuth) {
        setCurrentUserProp(userAuth);
        return;
      }

      const userRef = await createUserProfileDocument(userAuth);

      userRef.onSnapshot(snapShot => {
        setCurrentUserProp({
          currentUser: {
            id: snapShot.id,
            ...snapShot.data()
          }
        });
      });
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route
            path="/sign-in"
            render={() =>
              this.props.currentUser ? <Redirect to="/" /> : <SignIn />
            }
          />
          <Route
            path="/sign-up"
            render={() =>
              this.props.currentUser ? <Redirect to="/" /> : <SignUp />
            }
          />
          <Route exact path="/checkout" component={CheckoutPage} />
          <Route path={`/shop/:collectionId`} component={CollectionPage} />
          <Route exact path="/shop" component={ShopPage} />
          <Route exact path="/" component={HomePage} />
        </Switch>
      </div>
    );
  }
}
/** Redux state to prop map */
const mapStateToProps = state => ({
  currentUser: selectCurrentUser(state)
});
/** Redux prop to component dispatch */
const mapDispatchToProps = dispatch => ({
  setCurrentUserProp: user => dispatch(setCurrentUser(user))
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
