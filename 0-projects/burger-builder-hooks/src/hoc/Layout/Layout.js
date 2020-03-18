import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import "./Layout.css";

import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDraw from "../../components/Navigation/SideDraw/SideDraw";

const Layout = props => {
  const [showSideDraw, setShowSideDraw] = useState(false);

  const sideDrawClosedHandler = () => {
    setShowSideDraw(false);
  };

  const sideDrawToggleHandler = () => {
    setShowSideDraw(!showSideDraw);
  };

  return (
    <Fragment>
      <Toolbar
        isAuth={props.isAuthenticated}
        drawToggleClicked={sideDrawToggleHandler}
      />
      <SideDraw
        isAuth={props.isAuthenticated}
        open={showSideDraw}
        closed={sideDrawClosedHandler}
      />
      <main className="Content">{props.children}</main>
    </Fragment>
  );
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

export default connect(mapStateToProps)(Layout);
