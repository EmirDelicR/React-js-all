import React from "react";
import { Route } from "react-router-dom";
import "./ShopPage.scss";
import Overview from "../../components/Collection/Overview/Overview";

const ShopPage = ({ match }) => {
  return (
    <div className="shop-page">
      <Route exact path={`${match.path}`} component={Overview} />
    </div>
  );
};

export default ShopPage;
