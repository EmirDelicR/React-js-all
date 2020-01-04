import React, { Component } from "react";

class Lifecycle extends Component {
  constructor(props) {
    super(props);
    this.state = { data: "Some test data!" };
    console.log("[Lifecycle.js] constructor is executed!");
  }

  /** Must be static */
  static getDerivedStateFromProps(props, state) {
    console.log("[Lifecycle.js] getDerivedStateFromProps is executed!");
    return state;
  }

  componentDidMount() {
    console.log("[Lifecycle.js] componentDidMount is executed!");
    console.log("####### Press button to execute other life cycle #####");
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log("[Lifecycle.js] shouldComponentUpdate is executed!");
    /** Must return true or false - use for
     * optimization of component render
     *
     * can also use PureComponent
     * */
    return true;
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log("[Lifecycle.js] getSnapshotBeforeUpdate is executed!");
    return { msg: "Can be access as snapshot in componentDidUpdated" };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("[Lifecycle.js] componentDidUpdate is executed!");
    console.log(snapshot);
  }

  componentWillUnmount() {
    /** Use for clean up */
    console.log("[Lifecycle.js] componentWillUnmount is executed!");
  }
  render() {
    console.log("[Lifecycle.js] render is executed!");

    return <div>Test class lifecycle</div>;
  }
}

export default Lifecycle;
