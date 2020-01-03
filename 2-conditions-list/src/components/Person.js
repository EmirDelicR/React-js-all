import React from "react";

const person = props => {
  return (
    <div>
      <p>
        {props.name} {" -- "}
        <button onClick={props.delete}>DELETE</button>
      </p>
    </div>
  );
};

export default person;
