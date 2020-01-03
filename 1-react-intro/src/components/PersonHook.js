import React, { useState } from "react";

const PersonHook = props => {
  /** Use state return two elements: currentState, functionToUpdateState */
  const [state, setData] = useState({
    data: [{ description: "Some trivial data!" }]
  });

  const updateDescriptionHandler = () => {
    const newState = { ...state };
    newState.data[0].description = "Some NEW Trivial Data!";
    setData(newState);
  };

  return (
    <div>
      <p>{state.data[0].description}</p>
      <button onClick={updateDescriptionHandler}>Update with Hook</button>
    </div>
  );
};

export default PersonHook;
