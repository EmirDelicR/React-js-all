import React from "react";
import "./BuildControls.css";
import BuildControl from "./BuildControl/BuildControl";
import { CONTROLS } from "../../../utils/constants";

const buildControls = props => (
  <div className="BuildControls">
    <p>
      Current Price: <strong>{props.price.toFixed(2)}</strong> &euro;
    </p>
    {CONTROLS.map(ctrl => (
      <BuildControl
        key={ctrl.label}
        label={ctrl.label}
        added={() => props.ingredientAdded(ctrl.type)}
        removed={() => props.ingredientRemoved(ctrl.type)}
        disabled={props.disabled[ctrl.type]}
      />
    ))}
    <button
      className="OrderButton"
      disabled={!props.purchasable}
      onClick={props.ordered}
    >
      {props.isAuth ? "ORDER NOW" : "SIGN UP TO ORDER"}
    </button>
  </div>
);

export default buildControls;
