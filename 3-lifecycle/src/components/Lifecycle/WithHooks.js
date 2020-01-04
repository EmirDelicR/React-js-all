import React, { useEffect } from "react";

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

  return <p>Test - With Hooks</p>;
};

export default WithHooks;
