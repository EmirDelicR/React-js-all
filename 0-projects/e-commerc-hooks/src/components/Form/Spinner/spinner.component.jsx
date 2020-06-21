import React from 'react';
import './spinner.scss';

const WithSpinner = (WrappedComponent) => {
  const spinner = ({ isLoading, ...otherProps }) => {
    return isLoading ? (
      <div className="spinner__overlay">
        <div className="spinner"></div>
      </div>
    ) : (
      <WrappedComponent {...otherProps} />
    );
  };
  return spinner;
};

export default WithSpinner;
