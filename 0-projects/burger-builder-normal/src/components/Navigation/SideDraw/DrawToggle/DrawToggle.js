import React from "react";

import "./DrawToggle.css";

const drawToggle = props => (
  <div onClick={props.clicked} className="DrawToggle">
    <div></div>
    <div></div>
    <div></div>
  </div>
);

export default drawToggle;
