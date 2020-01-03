import React from "react";

const personFunction = props => {
  return (
    <div>
      <h1>
        Person Function Component <i>{props.name}</i>
      </h1>
      <div>{props.children}</div>
    </div>
  );
};

export default personFunction;
