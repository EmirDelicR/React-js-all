import React from "react";
import { withRouter } from "react-router-dom";
import "./Item.scss";

const Item = ({ item, history, match }) => {
  return (
    <div
      className={`menu-item ${item.size}`}
      onClick={() => history.push(`${match.url}${item.linkUrl}`)}
    >
      <div
        className="background-image-wrap"
        style={{ backgroundImage: `url(${item.imageUrl})` }}
      ></div>
      <div className="content">
        <h1 className="title">{item.title.toUpperCase()}</h1>
        <span className="subtitle">SHOP NOW</span>
      </div>
    </div>
  );
};

export default withRouter(Item);
