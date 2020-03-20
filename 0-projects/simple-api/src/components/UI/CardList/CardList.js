import React from 'react';
import Card from '../Card/Card';
import './CardList.css';

const CardList = ({ monsters }) => {
  const cardsArray = monsters.map(monster => {
    return (
      <Card
        key={monster.id}
        id={monster.id}
        name={monster.name}
        email={monster.email}
      />
    );
  });
  return <div className="card-list">{cardsArray}</div>;
};
export default CardList;
