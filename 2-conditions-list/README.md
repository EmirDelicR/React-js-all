**_Some useful links:_**

[Conditional Rendering](https://reactjs.org/docs/conditional-rendering.html)<br/>
[Lists & Keys](https://reactjs.org/docs/lists-and-keys.html)<br/>
[Error Boundaries](https://reactjs.org/docs/error-boundaries.html)

## content

- [Conditional rendering](#conditional-rendering)
- [Rendering lists](#rendering-lists)

## Conditional Rendering

```javascript
import React, { Component } from "react";
import Person from "./components/Person";

class App extends Component {
  state = {
    show: false
  };

  toggleHandler = () => {
    const show = !this.state.show;
    this.setState({ show });
  };

  render() {
    return (
      <div className="App">
        <h1>Press this button to conditional render content!</h1>
        <button onClick={this.toggleHandler}>PRESS ME</button>
        {this.state.show ? (
          <div>
            <Person name="Class" />
          </div>
        ) : null}
      </div>
    );
  }
}
export default App;
```

Or cleaner way

```javascript
import React, { Component } from "react";
import Person from "./components/Person";

class App extends Component {
  state = {
    show: false
  };

  toggleHandler = () => {
    const show = !this.state.show;
    this.setState({ show });
  };

  render() {
    let personTemplate = null;

    if (this.state.show) {
      personTemplate = (
        <div>
          <Person name="Class" />
        </div>
      );
    }
    return (
      <div className="App">
        <h1>Press this button to conditional render content!</h1>
        <button onClick={this.toggleHandler}>PRESS ME</button>
        {personTemplate}
      </div>
    );
  }
}

export default App;
```

[TOP](#content)

## Rendering Lists

```javascript
class App extends Component {
  state = {
    persons: [{ name: "Test_1" }, { name: "Test_2" }, { name: "Test_3" }]
  };

  render() {
    let personTemplate = null;

    if (this.state.show) {
      personTemplate = (
        <div>
          {this.state.persons.map((person, index) => {
            return (
              <Person
                delete={this.someFunction.bind(this, index)}
                name={person.name}
                // Index is not good KEY : use ID
                key={index}
              />
            );
          })}
        </div>
      );
    }
    return <div className="App">{personTemplate}</div>;
  }
}
```

[TOP](#content)
