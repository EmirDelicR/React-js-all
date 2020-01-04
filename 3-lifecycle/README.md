**_Some useful links:_**

## content

- [Folder Structure](#folder-structure)
- [Life-cycle](#lifecycle)
- [Higher Order Components](#hoc)

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
2. Do not contain logic or styling

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

[TOP](#content)
