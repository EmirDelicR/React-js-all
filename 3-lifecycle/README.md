**_Some useful links:_**

[More on useEffect()](https://reactjs.org/docs/hooks-effect.html)<br/>
[State & Life-cycle](https://reactjs.org/docs/state-and-lifecycle.html)<br/>
[PropTypes](https://reactjs.org/docs/typechecking-with-proptypes.html)<br/>
[Higher Order Components](https://reactjs.org/docs/higher-order-components.html)<br/>
[Refs](https://reactjs.org/docs/refs-and-the-dom.html)

## content

- [Folder Structure](#folder-structure)
- [Life-cycle](#lifecycle)
- [Higher Order Components](#hoc)
- [State](#state)
- [Prop Types](#prop)
- [Refs](#refs)
- [Context API](#context)

## Folder Structure

```
my-app/
  README.md
  node_modules/
  package.json

  src/
    assets/
    components/
        <Component Name>/
    containers/
        App.css
        App.js
        App.test.js
    index.css
    index.js
```

**_Containers_** manage state and logic

**_Class_** - Use if you need to manage State or access to Life-cycle Hooks

**_Functional_** - Use in all other cases

**_React Hooks_** - Use as much as possible

[TOP](#content)

## lifecycle

Check components/Lifecycle/Lifecycle.js file

```javascript
/** Constructor is executed first (only setup state) **/
constructor();
/** This is second (not used often, sync state with props) **/
getDerivedStateFromProps();
/** This is third  **/
render();
/** NOTE after render all childe component are rendered the the other
 * life-cycle hooks are executed **/

/** This is the fourth one (Use to cause Side effects) **/
componentDidMount();

/* The rest is update hooks*/
/* First */
shouldComponentUpdate();
/* The is execute Render and Childe Render */
/* Second - use to set scrolling position of user (have state of component) */
getSnapshotBeforeUpdate();
/* Third - do not update state here */
componentDidUpdated();

componentDidCatch();
/* Last - ise for clean up*/
componentWillUnmount();
```

In react hooks **_useEffect()_** can change all this life-cycle's

```js
const WithHooks = props => {
  /**
   * useEffect receive second argument
   * that can be use to execute this function only in some cases
   * if you pass [] it will execute only one time on initial load
   * if [props.someProp] it will execute only if this prop is changed
   */
  useEffect(() => {
    console.log("[WithHooks.js] useEffect function!");
  }, []);

  return <p>Test - With Hooks</p>;
};
```

```js
useEffect(() => {
  console.log("[WithHooks.js] useEffect function!");
  /* This will be executed when component is removed */
  return () => {
    console.log("[WithHooks.js] useEffect componentWillUnmount equivalent!");
  };
}, []);
```

```js
shouldComponentUpdate(nextProps, nextState) {
    console.log("[Lifecycle.js] shouldComponentUpdate is executed!");
    /** Must return true or false - use for
     * optimization of component render
     *
     * can also use PureComponent
     * */
    return true;
}
// React Hooks equivalent
export default React.memo(WithHooks)
```

[TOP](#content)

## hoc

1. Use to wrap other components
2. Do not contain logic
3. Naming convention is to start With<Name>

```js
const aux = props => props.children
export default aux

/** in component */
import Aux from './hoc/AuxFile'
<Aux>
    <OtherComponent>
    <OtherComponent>
</Aux>

```

```js
/** Or use Fragment **/
import { Fragment } from 'react'

<Fragment>
    <OtherComponent>
    <OtherComponent>
</Fragment>
```

```js
/** Or to pass props **/
import React from "react";
const withClass = props => (
  <div className={props.classes}>{props.children}</div>
);
export default withClass;

// In app.js
<WithClass classes="Some-Class">

```

[TOP](#content)

## state

Update the state if depending on other state in this way

```js
this.setState((prevState, props) => {
  return {
    data: prevState.data
  };
});
```

[TOP](#content)

## prop

Props Types

```console
npm install --save prop-types
```

```js
import PropTypes from "prop-types";

// After function or Class definition
class Person extends Component {}

Person.propTypes = {
  <prop-name>: PropsTypes.string,
  ...
};

// Check the rest of props types on link at beginning of this file

```

[TOP](#content)

## refs

```js
// In class

componentDidMount() {
  this.inputElement.focus()
}
render() {
  return (
    <input ref={(inputEl) => { this.inputElement = inputEl} }/>
  );
}
```

```js
// Or from React 16
constructor(props) {
  super(props)
  this.inputElmRef = React.createRef();
}

componentDidMount() {
  this.inputElmRef.current.focus();
}

render() {
  return (
    <input ref={this.inputElmRef}/>
  )
}
```

```js
/* Refs with React Hooks */
import React, { useEffect, useRef } from "react";

const WithHooks = props => {
  const toggleBtnRef = useRef(null);

  useEffect(() => {
    toggleBtnRef.current.click();
  });

  return (
    <div>
      <button ref={toggleBtnRef} onClick={() => console.log("CLICKED")}>
        WILL BE CLICKED AUTOMATICALLY
      </button>
    </div>
  );
};
export default WithHooks;
```

[TOP](#content)

## context

```js
/* create context/auth-context.js file */
import React from "react";

// React.createContext() - can pass object, array, string ...
const autContext = React.createContext({
  authenticated: false,
  login: () => {}
});

export default autContext;
```

```js
/* In Component wrap all elements that need to have this context */
import AuthContext from "../context/auth-context";

render() {
  return (
    <AuthContext.Provider
      value={{
        authenticated: this.state.authenticated,
        login: this.loginHandler
      }}
    >
      /* ... components */
    </AuthContext.Provider>;
  )
}
```

```js
/* In component that need to use context (NOTE belows is better way how to use) */
import AuthContext from "../context/auth-context";

<AuthContext.Consumer>
  {context => {
    console.log("CONTEXT: ", context);
    return <button onClick={context.login}>LOG IN</button>;
  }}
</AuthContext.Consumer>;
```

```js
/* Better way to use - Class Component */
import AuthContext from "../context/auth-context";

class SomeClass extends Component {
  /* Must be named like this */
  static contextType = AuthContext;
  /* Now we can access context anywhere in class like */
  componentDidMount() {
    /* authenticated is parameter in AuthContext function */
    /* Must access like this context is reserved word in React 16.6 and UP */
    this.context.authenticated;
  }
}

render() {
  return (
    <button onClick={context.login}>LOG IN</button>;
  )
}
```

```js
/* Better way to use - React Hooks */
import React, { useContext } from "react";
import AuthContext from "../context/auth-context";

const WithHooks = props => {
  const authContext = useContext(AuthContext);

  return ({ authContext.authenticated.toString() });
};

export default WithHooks;
```

[TOP](#content)
