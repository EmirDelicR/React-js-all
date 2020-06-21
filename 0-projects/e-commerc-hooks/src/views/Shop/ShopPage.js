import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import OverviewContainer from '../../components/Collection/Overview/Overview.container';
import { fetchCollectionStart } from '../../redux-state/shop/shop.actions';

import './ShopPage.scss';

const ShopPage = ({ fetchCollectionStart, match }) => {
  useEffect(() => {
    fetchCollectionStart();
  }, [fetchCollectionStart]);

  return (
    <div className="shop-page">
      <Route exact path={`${match.path}`} component={OverviewContainer} />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  fetchCollectionStart: () => dispatch(fetchCollectionStart()),
});
export default connect(null, mapDispatchToProps)(ShopPage);
