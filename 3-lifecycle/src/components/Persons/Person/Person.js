import React from "react";
import "./Person.css";
import AuthContext from "../../../context/auth-context";

const person = props => {
  return (
    <div className="Person">
      <AuthContext.Consumer>
        {context => {
          console.log("CONTEXT: ", context);
          return <button onClick={context.login}>LOG IN</button>;
        }}
      </AuthContext.Consumer>
      <p onClick={props.clicked}>I am {props.name}!</p>
      <p>{props.children}</p>
      <input type="text" onChange={props.changed} value={props.name} />
    </div>
  );
};

export default person;
