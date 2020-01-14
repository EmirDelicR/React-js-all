import React, { Component } from "react";
import { Route } from "react-router-dom";
// import { Link } from 'react-router-dom';

import "./Posts.css";

import { makeApiRequest, isResponseSuccess } from "../../../utils/api/api";
import { API_REQUEST_TYPES } from "../../../utils/constants";

import Post from "../../../components/Post/Post";
import FullPost from "../FullPost/FullPost";

class Posts extends Component {
  state = {
    posts: []
  };

  async componentDidMount() {
    const response = await makeApiRequest("/posts", API_REQUEST_TYPES.get);

    if (!isResponseSuccess(response)) {
      console.log("Error: ", response);
      return;
    }

    const posts = response.data.slice(0, 4);

    const updatePosts = posts.map(post => {
      return {
        ...post,
        author: "Some Author"
      };
    });

    this.setState({ posts: updatePosts });
  }

  postSelectedHandler = id => {
    // navigation after http request
    this.props.history.push({ pathname: "/posts/" + id });
  };

  render() {
    let posts = <p style={{ textAlign: "center" }}>Something went wrong!!!</p>;
    if (!this.state.error) {
      posts = this.state.posts.map(post => {
        return (
          // <Link to={'/' + post.id} key={post.id}>
          <Post
            key={post.id}
            title={post.title}
            author={post.author}
            clicked={() => this.postSelectedHandler(post.id)}
          />
          // </Link>
        );
      });
    }

    return (
      <div>
        <section className="Posts">{posts}</section>
        <Route
          path={this.props.match.url + "/:id"}
          exact
          component={FullPost}
        />
      </div>
    );
  }
}

export default Posts;
