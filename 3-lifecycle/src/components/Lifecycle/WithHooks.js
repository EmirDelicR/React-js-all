import React, { useEffect, useRef, useContext } from "react";
import AuthContext from "../../context/auth-context";

const WithHooks = props => {
  /**
   * useEffect receive second argument
   * that can be use to execute this function only in some cases
   * if you pass [] it will execute only one time on initial load
   * if [props.someProp] it will execute only if this prop is changed
   */
  useEffect(() => {
    console.log("[WithHooks.js] useEffect function!");
    return () => {
      console.log("[WithHooks.js] useEffect componentWillUnmount equivalent!");
    };
  }, []);

  const toggleBtnRef = useRef(null);

  useEffect(() => {
    toggleBtnRef.current.click();
  });

  const authContext = useContext(AuthContext);

  return (
    <div>
      <p>Test - With Hooks</p>
      <button ref={toggleBtnRef} onClick={() => console.log("CLICKED")}>
        WILL BE CLICKED AUTOMATICALLY
      </button>
      this is from Hooks: {authContext.authenticated.toString()}
    </div>
  );
};

export default WithHooks;
