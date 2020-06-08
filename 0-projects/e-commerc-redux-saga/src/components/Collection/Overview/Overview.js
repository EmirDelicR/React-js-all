import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCollectionsForPreview } from '../../../redux-state/shop/shop.selectors';

import './Overview.scss';

import Preview from '../Preview/Preview';

const Overview = ({ collections }) => (
  <div className="collection-overview">
    {collections.map((collection) => (
      <Preview key={collection.id} previewData={collection} />
    ))}
  </div>
);

const mapStateToProps = createStructuredSelector({
  collections: selectCollectionsForPreview,
});

export default connect(mapStateToProps)(Overview);
