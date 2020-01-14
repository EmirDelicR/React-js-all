**_Some useful links:_**

[ROuter Docks](https://reacttraining.com/react-router/web/guides/philosophy)

## content

- [Router](#router)
- [Router Component](#component)
- [withRouter](#with-router)
- [Lazy Load](#lazy)

## router

```console
npm install react-router-dom --save
```

Enable routing in application in (App.js)

```javascript
import { BrowserRouter } from "react-router-dom";

/**
 * <BrowserRouter/> A <Router> that uses the HTML5 history API (pushState, 
 * replaceState and the popstate event) to keep your UI in sync with the URL.
 * 
 * */

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Blog />
        </div>
      </BrowserRouter>
    );
  }
}
```

[TOP](#content)

## component

```js
import { Switch, Route, Link } from "react-router-dom";

/**
 *  <Router/> The most common use-case for using the low-level <Router> is to  
 *  synchronize a custom history with a state management lib like Redux or Mobx. 
 *  Note that this is not required to use state management libs alongside React 
 *  Router, it’s only for deep integration.
 * 
 *  <Route />  most basic responsibility is to render some UI when its path * *  *  matches the current URL
 * 
 *  <Link/> <NavLink/> Provides declarative, accessible navigation around your
 *  application.
 * 
 *  A <Switch> looks through all its children <Route>
 *  elements and renders the first one whose path
 *  matches the current URL. Use a <Switch> any time
 *  you have multiple routes, but you want only one
 *  of them to render at a time
 *  
 */

 <Router>
  <div>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
    </ul>
    
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/about">
        <About />
      </Route>
    </Switch>
  </div>
</Router>
```

[TOP](#content)

## With Router

```js
import React from "react";
import { withRouter } from 'react-router-dom';

const post = props => {
  console.log(props)
  return (
    <article className="Post" onClick={props.clicked}>
      <h1>{props.title}</h1>
      <div className="Info">
        <div className="Author">{props.author}</div>
      </div>
    </article>
  )
};

/** This give you option to pass router props to childe (in props) */
export default withRouter(post);


```

[TOP](#content)

## lazy

```js
import React, { Suspense, Component, lazy } from "react";

const AsyncNewPost = lazy(() => import('./NewPost/NewPost'))


<Route 
  path="/new-post" 
  render={
    () => {
      return (
        <Suspense fallback={<div>Loading...</div>}>
            <AsyncNewPost/>
        </Suspense> 
      )
    } 
  } 
/>
        
// Short 
<Route 
  path="/new-post" 
  render={
    () => <Suspense fallback={<div>Loading...</div>}><AsyncNewPost/></Suspense> 
  } 
  />
                 
```
[TOP](#content)

