import React from "react";

import "./Control.css";

const control = props => (
  <div className="CounterControl" onClick={props.clicked}>
    {props.label}
  </div>
);

export default control;
