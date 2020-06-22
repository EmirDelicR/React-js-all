import React from 'react';

import './Overview.scss';

import Preview from '../Preview/Preview';

const Overview = ({ collections }) => (
  <div className="collection-overview">
    {collections.map((collection) => (
      <Preview key={collection.id} previewData={collection} />
    ))}
  </div>
);

export default Overview;
