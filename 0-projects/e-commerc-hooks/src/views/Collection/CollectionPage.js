import React from 'react';
import { connect } from 'react-redux';
import { selectShopCollection } from '../../redux-state/shop/shop.selectors';
import './CollectionPage.scss';

import Item from '../../components/Collection/Item/Item';

const Collection = ({ collection }) => {
  console.log('CCCC: ', collection);
  return (
    <div className="collection-page">
      <h2 className="title">{collection.title}</h2>
      <div className="items">
        {collection.items.map((item) => (
          <Item key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    collection: selectShopCollection(ownProps.match.params.collectionId)(state),
  };
};

export default connect(mapStateToProps)(Collection);
