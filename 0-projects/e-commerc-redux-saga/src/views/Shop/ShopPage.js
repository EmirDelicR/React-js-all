import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import OverviewContainer from '../../components/Collection/Overview/Overview.container';
import { fetchCollectionStartAsync } from '../../redux-state/shop/shop.actions';

import './ShopPage.scss';

class ShopPage extends React.Component {
  componentDidMount() {
    const { fetchCollectionStartAsync } = this.props;
    fetchCollectionStartAsync();
  }

  render() {
    const { match } = this.props;
    return (
      <div className="shop-page">
        <Route exact path={`${match.path}`} component={OverviewContainer} />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchCollectionStartAsync: () => dispatch(fetchCollectionStartAsync()),
});
export default connect(null, mapDispatchToProps)(ShopPage);
