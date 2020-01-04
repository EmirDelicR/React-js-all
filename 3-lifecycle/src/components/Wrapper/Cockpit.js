import React from "react";

const cockpit = props => {
  const style = {
    backgroundColor: "green",
    color: "white",
    font: "inherit",
    border: "1px solid blue",
    padding: "8px",
    cursor: "pointer"
  };

  return (
    <div>
      <h1>Hi</h1>
      <p>Test</p>
      <button style={style} onClick={props.clicked}>
        Toggle
      </button>
    </div>
  );
};

export default cockpit;
