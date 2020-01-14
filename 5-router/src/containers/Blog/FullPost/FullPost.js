import React, { Component } from "react";

import "./FullPost.css";
import { makeApiRequest, isResponseSuccess } from "../../../utils/api/api";
import { API_REQUEST_TYPES } from "../../../utils/constants";

class FullPost extends Component {
  state = {
    loadedPost: null
  };

  constructor(props) {
    super(props);
    /** 
     * Cancel all subscriptions and asynchronous 
     * tasks in the componentWillUnmount method 
     * 
     * */
    this._isMounted = false;
  }

  componentDidMount() {
    // console.log(this.props);
    this._isMounted = true;
    this._isMounted && this.loadData();
  }

  /* For reload blogs on click */
  componentDidUpdate() {
    this._isMounted = true;
    this._isMounted && this.loadData();
  }
  
  componentWillUnmount() {
    this._isMounted = false;
  }
  async loadData() {
    if (!this.props.match.params.id) {
      return;
    }

    if (
      !this.state.loadedPost ||
      (this.state.loadedPost && this.state.loadedPost.id !== this.props.match.params.id)
    ) {
      const response = await makeApiRequest(
        `/posts/${this.props.match.params.id}`,
        API_REQUEST_TYPES.get
      );

      if (!isResponseSuccess(response)) {
        console.log("Error: ", response);
        return;
      }

      this._isMounted && this.setState({ loadedPost: response.data });
    }
  }

  deletePostHandler = async () => {
    const response = await makeApiRequest(
      `/posts/${this.props.match.params.id}`,
      API_REQUEST_TYPES.delete
    );

    if (!isResponseSuccess(response)) {
      console.log("Error: ", response);
      return;
    }

    console.log(response);
  };
  render() {
    let post = <p style={{ textAlign: "center" }}>Please select a Post!</p>;

    if (this.props.match.params.id) {
      post = <p style={{ textAlign: "center" }}>Loading...!</p>;
    }

    if (this.state.loadedPost) {
      post = (
        <div className="FullPost">
          <h1>{this.state.loadedPost.title}</h1>
          <p>{this.state.loadedPost.body}</p>
          <div className="Edit">
            <button onClick={this.deletePostHandler} className="Delete">
              Delete
            </button>
          </div>
        </div>
      );
    }

    return post;
  }
}

export default FullPost;
