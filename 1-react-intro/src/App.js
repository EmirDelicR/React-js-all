import React, { Component } from "react";
import "./App.css";

import PersonClass from "./components/PersonClass";
import PersonFunction from "./components/PersonFunction";
import PersonHook from "./components/PersonHook";
import MethodReference from "./components/MethodReference";
import Binding from "./components/Binding";
import Styling from "./components/Styling";

class App extends Component {
  state = {
    persons: [{ name: "Test_1" }, { name: "Test_2" }, { name: "Test_3" }]
  };

  switchNameHandler = index => {
    // DON'T DO THIS: this.state.persons[0].name = "New_Test_1";
    const newPersons = [...this.state.persons];
    newPersons[index].name = `New_Test_${index + 1}`;
    this.setState({
      persons: newPersons
    });
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
        <PersonClass name="Class" />
        <hr />
        <PersonFunction name="Function" />
        <hr />
        <PersonFunction name="Receiving Children!">
          <PersonClass name="I am pass as children!!" />
        </PersonFunction>
        <hr />
        <h3>State</h3>
        <PersonClass name={this.state.persons[0].name} />
        <hr />
        <PersonFunction name={this.state.persons[1].name} />
        <hr />
        <h3>Event handle</h3>
        <button onClick={this.switchNameHandler.bind(this, 0)}>
          Handle event
        </button>
        <hr />
        <h3>Using useState Hook</h3>
        <PersonHook />
        <hr />
        <h3>Passing method reference</h3>
        <MethodReference updateName={this.switchNameHandler.bind(this, 1)} />
        <MethodReference updateName={() => this.switchNameHandler(1)} />
        <hr />
        <h3>Two way binding</h3>
        <Binding
          change={this.changeNameHandler}
          name={this.state.persons[1].name}
        />
        <hr />
        <h3>Styling component</h3>
        <Styling />
      </div>
    );
  }
}

export default App;
