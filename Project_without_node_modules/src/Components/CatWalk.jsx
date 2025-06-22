import React from 'react';
import './CatWalk.css';
import catWalk from '../assets/images/walking_cat.gif';
const CatWalk = () => {
  return (
    <div className="cat-container">
      <img src={catWalk} alt="Walking cat" className="cat" />
    </div>
  );
};

export default CatWalk;