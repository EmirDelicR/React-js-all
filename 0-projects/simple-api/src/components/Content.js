import React, { useEffect, useState } from 'react';
import { makeApiCall } from '../utils/api/api';
import Search from './UI/Search/Search';
import CardList from './UI/CardList/CardList';

const Content = () => {
  const [userData, setUserData] = useState([]);
  const [dataToHandle, setDataToHandle] = useState([]);

  const getUserData = async url => {
    const serverData = await makeApiCall(url);
    setUserData(serverData);
    setDataToHandle(serverData);
  };

  const onSearchHandler = event => {
    const searchBy = event.target.value;
    if (searchBy === '') {
      setDataToHandle(userData);
      return;
    }
    const searchedData = userData.filter(
      elem => elem.name.toLowerCase().indexOf(searchBy.toLowerCase()) !== -1
    );

    setDataToHandle(searchedData);
  };

  useEffect(() => {
    getUserData('users');
  }, []);

  return (
    <div className="Content">
      <Search onSearchHandler={onSearchHandler} />
      <CardList monsters={dataToHandle} />
    </div>
  );
};

export default Content;
