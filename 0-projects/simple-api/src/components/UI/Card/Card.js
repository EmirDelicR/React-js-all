import React from 'react';
import './Card.css';

const Card = ({ name, email, id }) => {
  return (
    <div className="card-container">
      <img
        src={`https://robohash.org/${id}?size=200x200;set=set2`}
        alt="Monsters"
        style={{ height: '200px', width: '200px' }}
      />
      <div>
        <h2>{name}</h2>
        <p>{email}</p>
      </div>
    </div>
  );
};

export default Card;
