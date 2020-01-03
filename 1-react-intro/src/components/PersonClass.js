import React, { Component } from "react";

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

export default PersonClass;
