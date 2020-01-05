import React, { useEffect } from "react";
import Aux from "../../hoc/Aux";

const AuxWrapped = props => {
  useEffect(() => {});

  return (
    <Aux>
      <p>Test - With Aux Wrap</p>
      <p>Test - With Aux Wrap</p>
    </Aux>
  );
};

export default AuxWrapped;
