import React, { Component } from "react";

import "./FullPost.css";
import { makeApiRequest, isResponseSuccess } from "../../utils/api/api";
import { API_REQUEST_TYPES } from "../../utils/constants";

class FullPost extends Component {
  state = {
    loadedPost: null
  };

  async componentDidUpdate() {
    if (!this.props.id) {
      return;
    }

    if (
      !this.state.loadedPost ||
      (this.state.loadedPost && this.state.loadedPost.id !== this.props.id)
    ) {
      const response = await makeApiRequest(
        `/posts/${this.props.id}`,
        API_REQUEST_TYPES.get
      );

      if (!isResponseSuccess(response)) {
        console.log("Error: ", response);
        return;
      }

      this.setState({ loadedPost: response.data });
    }
  }

  deletePostHandler = async () => {
    const response = await makeApiRequest(
      `/posts/${this.props.id}`,
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

    if (this.props.id) {
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
