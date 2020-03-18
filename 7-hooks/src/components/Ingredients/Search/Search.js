import React, { useState, useEffect, useRef } from "react";

import Card from "../../UI/Card/Card";
import "./Search.css";

import { mockApiCall } from "../../../utils/helpers";

const Search = React.memo(props => {
  const [searchBy, setSearchBy] = useState("");
  const searchRef = useRef();

  const fetchAndFilterDataFromServer = async () => {
    try {
      const { isResolved, data } = await mockApiCall(true);
      if (!isResolved) {
        return;
      }
      const filteredData =
        searchBy === "" ? data : data.filter(elem => elem.title === searchBy);
      props.onSearchIngredients(filteredData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchBy === searchRef.current.value) {
        fetchAndFilterDataFromServer();
      }
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [searchBy, searchRef]);

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input
            ref={searchRef}
            type="text"
            value={searchBy}
            onChange={e => setSearchBy(e.target.value)}
          />
        </div>
      </Card>
    </section>
  );
});

export default Search;
