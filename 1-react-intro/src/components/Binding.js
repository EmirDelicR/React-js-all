import React from "react";

const binding = props => {
  return (
    <div>
      Input some data:
      <input type="text" onChange={props.change} value={props.name} />
    </div>
  );
};

export default binding;
