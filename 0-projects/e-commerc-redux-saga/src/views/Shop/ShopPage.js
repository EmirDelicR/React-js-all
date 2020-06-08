import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import './ShopPage.scss';
import Overview from '../../components/Collection/Overview/Overview';
import {
  firestore,
  convertCollectionsSnapshotToMap,
} from '../../firebase/utils';

import { updateCollections } from '../../redux-state/shop/shop.actions';

class ShopPage extends React.Component {
  unsubscribeFromSnapshot = null;

  componentDidMount() {
    const { updateCollections } = this.props;
    const collectionRef = firestore.collection('collections');
    collectionRef.onSnapshot(async (snapshot) => {
      const collectionsMap = await convertCollectionsSnapshotToMap(snapshot);
      console.log('CM: ', collectionsMap);
      updateCollections(collectionsMap);
    });
  }

  render() {
    const { match } = this.props;
    return (
      <div className="shop-page">
        <Route exact path={`${match.path}`} component={Overview} />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  updateCollections: (collectionsMap) =>
    dispatch(updateCollections(collectionsMap)),
});
export default connect(null, mapDispatchToProps)(ShopPage);
