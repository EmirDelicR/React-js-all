import React from 'react';
import './Search.css';

const Search = ({ onSearchHandler }) => {
  return (
    <div className="">
      <input
        className=""
        type="search"
        placeholder="Search..."
        onChange={onSearchHandler}
      />
    </div>
  );
};
export default Search;
