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
