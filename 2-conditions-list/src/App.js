import React, { Component } from "react";
import "./App.css";

import Person from "./components/Person";

class App extends Component {
  state = {
    persons: [{ name: "Test_1" }, { name: "Test_2" }, { name: "Test_3" }],
    show: false
  };

  toggleHandler = () => {
    const show = !this.state.show;
    this.setState({ show });
  };

  deleteHandler = index => {
    const persons = [...this.state.persons];
    persons.splice(index, 1);
    this.setState({ persons });
  };

  render() {
    let personTemplate = null;

    if (this.state.show) {
      personTemplate = (
        <div>
          {this.state.persons.map((person, index) => {
            return (
              <Person
                delete={this.deleteHandler.bind(this, index)}
                name={person.name}
                key={index}
              />
            );
          })}
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
