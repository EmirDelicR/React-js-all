import React, { Component } from "react";
import "./App.css";
import Persons from "../components/Persons/Persons";
import Cockpit from "../components/Wrapper/Cockpit";
import Lifecycle from "../components/Lifecycle/Lifecycle";
import WithHooks from "../components/Lifecycle/WithHooks";

class App extends Component {
  state = {
    persons: [
      { id: "1", name: "Test_1" },
      { id: "2", name: "Test_2" },
      { id: "3", name: "Test_3" }
    ],
    show: false
  };

  deleteHandler = index => {
    const persons = [...this.state.persons];
    persons.splice(index, 1);
    this.setState({ persons });
  };

  toggleHandler = () => {
    const show = !this.state.show;
    this.setState({ show: show });
  };

  changeHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const person = { ...this.state.persons[personIndex] };

    person.name = event.target.value;
    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({ persons });
  };

  render() {
    let persons = null;

    if (this.state.show) {
      persons = (
        <Persons
          persons={this.state.persons}
          clicked={this.deleteHandler}
          changed={this.changeHandler}
        />
      );
    }

    return (
      <div className="App">
        <Lifecycle />
        <WithHooks />
        <Cockpit
          persons={this.state.persons}
          show={this.state.show}
          clicked={this.toggleHandler}
        />
        {persons}
      </div>
    );
  }
}

export default App;
