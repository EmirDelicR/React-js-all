import React from "react";
// import { withRouter } from 'react-router-dom';

import "./Post.css";

const post = props => (
  <article className="Post" onClick={props.clicked}>
    <h1>{props.title}</h1>
    <div className="Info">
      <div className="Author">{props.author}</div>
    </div>
  </article>
);

/** This give you option to pass router props to childe (in props) */
// export default withRouter(post);
export default post;
