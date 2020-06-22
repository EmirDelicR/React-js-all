import React from 'react';
import './CollectionPage.scss';

import Item from '../../components/Collection/Item/Item';

const Collection = ({ collection }) => {
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

export default Collection;
