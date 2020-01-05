import React from "react";

// React.createContext() - can pass object, array, string ...
const autContext = React.createContext({
  authenticated: false,
  login: () => {}
});

export default autContext;
