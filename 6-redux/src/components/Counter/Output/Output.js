import React from "react";

import "./Output.css";

const output = props => (
  <div className="CounterOutput">Current Counter: {props.value}</div>
);

export default output;
