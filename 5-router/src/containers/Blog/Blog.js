import React, { Suspense, Component, lazy } from "react";
import { Route, NavLink, Switch } from "react-router-dom";

import "./Blog.css";

import Posts from "./Posts/Posts";
const AsyncNewPost = lazy(() => import('./NewPost/NewPost'))

// import asyncComponent from "../../hoc/asyncComponent";
// const AsyncNewPost = asyncComponent(() => {
//   return import("./NewPost/NewPost");
// });

class Blog extends Component {
  state = {
    auth: true
  };

  render() {
    return (
      <div className="Blog">
        <header>
          <nav>
            <ul>
              <li>
                <NavLink
                  to="/posts/"
                  exact
                  activeClassName="my-active"
                  activeStyle={{
                    color: "#fa923f",
                    textDecoration: "underline"
                  }}
                >
                  Posts
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={{
                    pathname: "/new-post",
                    hash: "#submit",
                    search: "?quick-submit=true"
                  }}
                >
                  New Posts
                </NavLink>
              </li>
            </ul>
          </nav>
        </header>

        <Switch>
           {/* 
             Old way with lazy load function
             <Route path="/new-post" component={AsyncNewPost}         
           */}

          {this.state.auth ? (
            <Route path="/new-post" render={() => <Suspense fallback={<div>Loading...</div>}><AsyncNewPost/></Suspense> } />
          ) : null}
          ;
          <Route path="/posts/" component={Posts} />

          {/* Handle 404 page, put this alway last */}
          <Route render={() => <h1>Not found</h1>} />

        </Switch>
      </div>
    );
  }
}

export default Blog;
