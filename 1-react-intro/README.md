**_Some useful links:_**

[create-react-app](https://github.com/facebookincubator/create-react-app)
[Introducing JSX](https://reactjs.org/docs/introducing-jsx.html)
[Rendering Elements](https://reactjs.org/docs/rendering-elements.html)
[Components & Props](https://reactjs.org/docs/components-and-props.html)
[Listenable Events](https://reactjs.org/docs/events.html)

## content

- [Class Component](#class)
- [Function Component](#function)
- [Props](#props)
- [Children](#children)
- [State](#state)
- [Event](#event)
- [useState() Hook](#use-state-hook)
- [Passing method reference](#reference)
- [Two way binding](#binding)
- [Adding Styling](#styling)

## class

```javascript
import React, { Component } from "react";

class App extends Component {
  render() {
      return(
        <div>Test</div>;
      );
  }
}

export default App;

// In index.js
import App from "./App";

ReactDOM.render(<App />, document.getElementById("root"));
```

[TOP](#content)

## function

```javascript
import React from "react";
import "./App.css";

const app = () => {
  return <div className="App">Test</div>;
};

export default app;

// In index.js
import App from "./App";

ReactDOM.render(<App />, document.getElementById("root"));
```

[TOP](#content)

## props

```javascript
// In class
class PersonClass extends Component {
  render() {
    return (
      <div>
        <h1>
          Person Class Component <i>{this.props.name}</i>
        </h1>
      </div>
    );
  }
}

// In function
const personFunction = props => {
  return (
    <div>
      <h1>
        Person Function Component <i>{props.name}</i>
      </h1>
    </div>
  );
};

// In app.js
<PersonClass name="Class" />
<PersonFunction name="Function" />
```

[TOP](#content)

## children

Children is reserve keyword that is used to read HTML passed to component

```javascript
const personFunction = props => {
  return (
    <div>
      <p>{props.children}</p>
    </div>
  );
};

// In app.js
<PersonFunction name="Receiving Children!">
  <PersonClass name="I am pass as children!!" />
</PersonFunction>;
```

[TOP](#content)

## state

Change in state triggers rendering in react component

```javascript
// State in class Component
class App extends Component {
  state = {
    persons: [{ name: "Test_1" }, { name: "Test_2" }, { name: "Test_3" }]
  };

  render() {
    return <PersonClass name={this.state.persons[0].name} />;
  }
}
```

[TOP](#content)

## event

By convention add Handler at end of function name

```javascript
// In class component
state = {
  persons: [{ name: "Test_1" }, { name: "Test_2" }, { name: "Test_3" }]
};

switchNameHandler = () => {
  // DON'T DO THIS: this.state.persons[0].name = "New_Test_1";
  const newPersons = [...this.state.persons];
  newPersons[0].name = "New_Test_1";
  this.setState({
    persons: newPersons
  });
};

render() {
    return <button onClick={this.switchNameHandler}>Handle event</button>
    // To pass data to function
    <button onClick={() => this.switchNameHandler(someData)}>Handle event</button>
}
```

[TOP](#content)

## Use State Hook

**_NOTE:_**

1. Can use multiple useState hooks in function component
2. updateFunction is overwriting the state and not updating
3. If receive error rename function Component to capital name

```javascript
import React, { useState } from "react";

const PersonHook = props => {
  /** Use state return two elements: currentState, functionToUpdateState */
  const [state, setData] = useState({
    data: [{ description: "Some trivial data!" }]
  });

  const updateDescriptionHandler = () => {
    const newState = { ...state };
    newState.data[0].description = "Some NEW Trivial Data!";
    setData(newState);
  };

  return (
    <div>
      <p>{state.data[0].description}</p>
      <button onClick={updateDescriptionHandler}>Update with Hook</button>
    </div>
  );
};

export default PersonHook;
```

[TOP](#content)

## reference

```javascript
import React from "react";

const methodReference = props => {
  return (
    <div>
      <p onClick={props.updateName}>
        Click on this to set Test_2 to New_Test_2"
      </p>
    </div>
  );
};

export default methodReference;

// In App.js
<MethodReference updateName={this.switchNameHandler.bind(this, 1)} />;
// OR
<MethodReference updateName={() => this.switchNameHandler(1)} />;
// Using Bind is performance better
```

[TOP](#content)

## binding

```javascript
import React from "react";

const binding = props => {
  return (
    <div>
      Input some data:
      <input type="text" onChange={props.change} value={props.name} />
    </div>
  );
};

export default binding;
```

In App.js

```javascript
import React, { Component } from "react";
import Binding from "./components/Binding";

class App extends Component {
  state = {
    persons: [{ name: "Test_1" }, { name: "Test_2" }, { name: "Test_3" }]
  };

  changeNameHandler = event => {
    const newPersons = [...this.state.persons];
    newPersons[1].name = event.target.value;
    this.setState({
      persons: newPersons
    });
  };

  render() {
    return (
      <div className="App">
        <Binding
          change={this.changeNameHandler}
          name={this.state.persons[1].name}
        />
      </div>
    );
  }
}
```

[TOP](#content)

## styling

```css
// style.css
.SS {
  color: red;
}
```

```javascript
import React from "react";
import "./style.css";

const styling = props => {
  const style = {
    color: "green"
  };

  return (
    <div>
      <p className="SS">Some color text</p>
      <p style={style}>Some inline style</p>
    </div>
  );
};

export default styling;
```

[TOP](#content)
