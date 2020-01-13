import React, { Component } from "react";

import "./Blog.css";
import { makeApiRequest, isResponseSuccess } from "../../utils/api/api";
import { API_REQUEST_TYPES } from "../../utils/constants";

import Post from "../../components/Post/Post";
import FullPost from "../../components/FullPost/FullPost";
import NewPost from "../../components/NewPost/NewPost";

class Blog extends Component {
  state = {
    posts: [],
    selectedPostId: null,
    error: false
  };

  async componentDidMount() {
    this.setState({ error: false });

    const response = await makeApiRequest("/posts", API_REQUEST_TYPES.get);

    if (!isResponseSuccess(response)) {
      this.setState({ error: true });
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
    this.setState({ selectedPostId: id });
  };

  render() {
    let posts = <p style={{ textAlign: "center" }}>Something went wrong!</p>;
    if (!this.state.error) {
      posts = this.state.posts.map(post => {
        return (
          <Post
            key={post.id}
            title={post.title}
            author={post.author}
            clicked={() => this.postSelectedHandler(post.id)}
          />
        );
      });
    }

    return (
      <div>
        <section className="Posts">{posts}</section>
        <section>
          <FullPost id={this.state.selectedPostId} />
        </section>
        <section>
          <NewPost />
        </section>
      </div>
    );
  }
}

export default Blog;
