import React, { Component, Fragment } from "react";
// import { connect } from "react-redux";
import "./Layout.css";

import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDraw from "../../components/Navigation/SideDraw/SideDraw";

class Layout extends Component {
  state = {
    showSideDraw: false
  };

  sideDrawClosedHandler = () => {
    this.setState({ showSideDraw: false });
  };

  sideDrawToggleHandler = () => {
    this.setState(prevState => {
      return { showSideDraw: !prevState.showSideDraw };
    });
  };

  render() {
    return (
      <Fragment>
        <Toolbar
          isAuth={this.props.isAuthenticated}
          drawToggleClicked={this.sideDrawToggleHandler}
        />
        <SideDraw
          isAuth={this.props.isAuthenticated}
          open={this.state.showSideDraw}
          closed={this.sideDrawClosedHandler}
        />
        <main className="Content">{this.props.children}</main>
      </Fragment>
    );
  }
}

// const mapStateToProps = state => {
//   return {
//     isAuthenticated: state.auth.token !== null
//   };
// };
export default Layout;
// export default connect(mapStateToProps)(Layout);
