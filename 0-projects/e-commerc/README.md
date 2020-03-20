**_Setup SCSS_**

To use SASS in React just install node-sass

```console
npm i node-sass --save-dev
```

### React router

**_React Router_**

[Router](https://reacttraining.com/react-router/web/guides/quick-start)

```console
npm install react-router-dom
```

```js
/* index.js */
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
```

In component

```js
/* App.js */
import { Route, Link, Switch } from "react-router-dom";

/* BUild nav bar component */
<nav>
  <ul>
    <li>
      <Link to="/">Home</Link>
    </li>
    <li>
      <Link to="/about">About</Link>
    </li>
    <li>
      <Link to="/users">Users</Link>
    </li>
  </ul>
</nav>;

/* Build content component */
<Switch>
  <Route path="/about">
    <About />
  </Route>
  <Route path="/users">
    <Users />
  </Route>
  <Route path="/">
    <Home />
  </Route>
</Switch>;
```

**_Redirect and render_**

```js
import { Redirect } from "react-router-dom";

<Route
  path="/sign-in"
  render={() => (this.props.currentUser ? <Redirect to="/" /> : <SignIn />)}
/>;
```

**_ withRouter_**

This is HOC - Higher order component, it allows that any component have access to history

```js
/* Item.js */
import { withRouter } from "react-router-dom";

const Item = ({ item, history }) => {};

export default withRouter(Item);
```

### SVG

**_Adding SVG_**

[Adding Images, files](https://create-react-app.dev/docs/adding-images-fonts-and-files/)

```js
import { ReactComponent as Logo } from "../../assets/crown.svg";

<Logo className="Logo" />;
```

### Form

**_Form_**

Check sign in form

```js
class SignIn extends Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: ""
    };
  }

  handleSubmit = event => {
    event.preventDefault();
  };

  handleChange = event => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className="sign-in">
        <form onSubmit={this.handleSubmit}>
          <input
            name="email"
            type="email"
            value="this.state.email"
            placeholder="Email..."
            onChange={this.handleChange}
            required
          />
          <label>Email</label>
          <input
            name="password"
            type="password"
            value="this.state.password"
            placeholder="password..."
            onChange={this.handleChange}
            required
          />
          <label>Password</label>

          <input type="submit" value="Submit Form" />
        </form>
      </div>
    );
  }
}

export default SignIn;
```

### Firebase

**_FIREBASE Integration_**

1. Go to Firebase
2. Create project
3. go to project OverView and check Web
4. Register App
5. Grab Firebase SDK

```js
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
```

In project

```console
npm install firebase --save
```

Create folder firebase in src/firebase/utils.js

```js
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MSG_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
```

To get the config go to project DB on overview and below name of db press **_square (1 app)_**, press on gear(settings)
Scroll down to **_Firebase SDK snippet_**

### Google Sign in

**_Google Sign In_**

In src/firebase/utils.js

```js
/* Initialize Firebase */
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

/* GOOGLE login */
const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;
```

Set up in firebase:

**_Authentication-Tab / Users / Set up sign-in method_**

Choose Google and press edit icon, choose email and save, check the enable button

In component

```js
import { signInWithGoogle } from "../../../firebase/utils";

<FormButton onClick={signInWithGoogle}>Sign In with Google</FormButton>;
```

**_Access user that is login_**

```js
import { auth } from "../../firebase/utils";

class App extends Component {
  constructor() {
    super();

    this.state = {
      currentUser: null
    };
  }

  /* To clear memory leak */
  unsubscribeFromAuth = null;

  componentDidMount() {
    /* Get login user */
    this.unsubscribeFromAuth = auth.onAuthStateChanged(user => {
      this.setState({ currentUser: user });
    });
  }

  componentWillUnmount() {
    /* Remove at end to prevent memory leak*/
    this.unsubscribeFromAuth();
  }
}
```

### Firebase Queries

you can make query using fetch

```js
const makeApiCall = async (url, method = 'GET', dataToSend = null) => {
  if (!navigator.onLine) {
    return;
  }
  const BASE_URL = 'FIREBASE_BASE_URL';
  const CONFIG = {
    method
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  };

  if (method !== 'GET' && dataToSend !== null) {
    CONFIG.body = JSON.stringify(dataToSend);
  }

  try {
    const rawData = await fetch(`${BASE_URL}${url}.json`, CONFIG);
    const data = await rawData.json();
    return data;
  } catch (err) {
    console.log('Api call failed: ', err);
  }
};
```

OR you can use **_firestore_**

```js
const userRef = firestore.doc("/users/:userId");
firestore.collections("/users");

/* 
  After collection is get use 
  userRef.get();
  .set();
  .update();
  .delete();
  .add();
*/
```

### Set user from Google auth

```js
export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

/* In component */
componentDidMount() {
  this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
    if (!userAuth) {
      this.setUser({currentUser: null})
      return;
    }
    const userRef = await createUserProfileDocument(userAuth);

    /**
     * snapShot have ID
     * snapShot.data() - rest of data
     */
    userRef.onSnapshot(snapShot => {
      this.setState({
        currentUser: {
          id: snapShot.id,
          ...snapShot.data()
        }
      })
    })
  });
}
```

### Redux

State management for React - Single source of true

```console
npm i redux redux-logger react-redux
```

**_Setup_**

```js
/* In index.js */

import { Provider } from "react-redux";

ReactDOM.render(
  <Provider>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);
```

**_Structure_**

check folder redux-state

**_Reducer_**

```js
const userReducer = (currentState, action) => {
  /**
   * action = {
   *  type: String,
   *  payload: any
   * }
   */

  switch (action.type) {
    case "SET_CURRENT_USER":
      return {
        ...currentState,
        currentUser: action.payload
      };
    default:
      return currentState;
  }
};
```

**_Combine reducers_**

```js
/* root-reducers.js */
import { combineReducers } from "redux";

import userReducer from "./user/user.reducer";

const REDUCERS = {
  user: userReducer
};

export default combineReducers(REDUCERS);
```

**_Create an store_**

```js
/* redux-state/index.js */
import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import rootReducer from "./root-reducer";

const middlewares = [logger];

const store = createStore(rootReducer, applyMiddleware(...middlewares));
export default store;
```

**_Give provider context store_**

```js
/* index.js */

import { Provider } from "react-redux";
import store from "./redux-state/index";

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);
```

**_Actions_**

```js
const setCurrentUser = user => ({
  type: "SET_CURRENT_USER",
  payload: user
});
```

**_Connect form Redux_**

```js
/* Connect is HOC that connect component to redux (check Header.js file)*/
import { connect } from "react-redux";

const mapStateToProps = state => ({
  currentUser: state.user.currentUser
});

export default connect(mapStateToProps)(Header);

/* Check App.js */
import { setCurrentUser } from "../../redux-state/user/user.actions";

// Remove Constructor from class
// Rename all this.setState to this.props.[mapDispatchToProps key]
const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(null, mapDispatchToProps)(App);
```

**_Reselect_**

Use reselect to make MEMOIZATION (cache with has table)
Increase performance by not rendering component if they are not changed

```console
npm i reselect
```

In redux-state check cart/cart.selectors.js

How this work

```js
/** Icon.js file **/
import { createSelector } from "reselect";

/* Step 4. this is return state.cart */
const currentCart = state => state.cart;

/* Step 3. the function make reference to [currentCart] */
/* Step 5. this is accessing then  state.cart and returns cartItems */
const selectCartItems = createSelector([currentCart], cart => cart.cartItems);

/* Step 2. the function make reference to [selectCartItems] */
/* Step 6. this is accessing then cartItems and returns total quantity */
const selectCartItemsCount = createSelector([selectCartItems], cartItems =>
  cartItems.reduce((acc, item) => acc + item.quantity, 0)
);

export { selectCartItems, selectCartItemsCount };

/* Cart/Icon/Icon.js */

import { selectCartItemsCount } from "../../../redux-state/cart/cart.selectors";

const mapStateToProps = state => ({
  /* Step 1. the function from selector is called */
  itemCount: selectCartItemsCount(state)
});
```

Option

```js
import { createStructuredSelector } from "reselect";
/* This is just passing top level state automatically to functions
 * like : currentUser: selectCurrentUser(state)
 */
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  isCartHidden: selectCartHiddenStatus
});
```

**_Redux Persist using local storage_**

[Redux-persist npm](https://www.npmjs.com/package/redux-persist)

```console
npm i redux-persist
```

```js
/* in redux-store/index.js */
import { persistStore } from "redux-persist";

export const persistor = persistStore(store);

/* in redux-store root-reducer.js */
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  /* This here is cartReducer, add more if need*/
  whitelist: ["cart"]
};

const REDUCERS = {
  user: userReducer,
  cart: cartReducer
};

const ROOT_REDUCER = combineReducers(REDUCERS);

export default persistReducer(persistConfig, ROOT_REDUCER);

/* in root index.js */
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux-state/index";

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </Router>
  </Provider>,
  document.getElementById("root")
);
```

**_Router- making sub route_**

```js
/* In App.js */
<Route path={`/shop/:collectionId`} component={CollectionPage} />;
/* In CollectionPage.js */
const mapStateToProps = (state, ownProps) => ({
  /* You can pass own props that si history in the end */
  shopCollection: selectShopCollection(ownProps.match.props.collectionId)(state)
});

export default connect(mapStateToProps)(Collection);
```

**_Stripe - payment_**

[react-stripe-checkout](https://www.npmjs.com/package/react-stripe-checkout)

```console
npm i react-stripe-checkout
```

```js
import React from "react";
import StripeCheckout from "react-stripe-checkout";

const StripeButton = ({ price }) => {
  /** Price must be in cents */
  const priceForStripe = price * 100;
  const publicKey = process.env.REACT_APP_STRIPE_KEY;

  const onToken = token => {
    console.log("Stripe Token: ", token);
    /** Process payment here  */
  };
  return (
    <StripeCheckout
      label="Pay Now"
      name="CROWN SHOP GmbH"
      billingAddress
      shippingAddress
      image="https://sendeyo.com/up/d/f3eb2117da"
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publicKey}
    />
  );
};

export default StripeButton;
```
