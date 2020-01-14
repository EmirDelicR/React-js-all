import React, { Component } from "react";

import "./NewPost.css";
import { makeApiRequest, isResponseSuccess } from "../../../utils/api/api";
import { API_REQUEST_TYPES } from "../../../utils/constants";

class NewPost extends Component {
  state = {
    title: "",
    content: "",
    author: "Some Author"
  };

  componentDidMount() {
    console.log('Router Props: ', this.props)
  }

  postDataHandler = async () => {
    const data = {
      title: this.state.title,
      body: this.state.content,
      author: this.state.author
    };
    const response = await makeApiRequest(
      "/posts",
      API_REQUEST_TYPES.post,
      data
    );

    if (!isResponseSuccess(response)) {
      console.log("Error: ", response);
      return;
    }
    this.props.history.replace('/posts');
    console.log(response);
  };

  render() {
    return (
      <div className="NewPost">
        <h1>Add a Post</h1>
        <label>Title</label>
        <input
          type="text"
          value={this.state.title}
          onChange={event => this.setState({ title: event.target.value })}
        />
        <label>Content</label>
        <textarea
          rows="4"
          value={this.state.content}
          onChange={event => this.setState({ content: event.target.value })}
        />
        <label>Author</label>
        <select
          value={this.state.author}
          onChange={event => this.setState({ author: event.target.value })}
        >
          <option value="Author 1">Author 1</option>
          <option value="Author 2">Author 2</option>
        </select>
        <button onClick={this.postDataHandler}>Add Post</button>
      </div>
    );
  }
}

export default NewPost;
