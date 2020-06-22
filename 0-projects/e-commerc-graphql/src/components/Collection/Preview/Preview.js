import React from 'react';
import './Preview.scss';
import Item from '../Item/Item.container';

const Preview = ({ previewData }) => (
  <div className="collection-preview">
    <h1 className="title">{previewData.title.toUpperCase()}</h1>
    <div className="preview">
      {previewData.items
        .filter((item, index) => index < 4)
        .map((item) => (
          <Item key={item.id} item={item} />
        ))}
    </div>
  </div>
);

export default Preview;
