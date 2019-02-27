import React, { useState, useEffect } from 'react';
import api from '../../api';
import ShowcaseBox from '../ShowcaseBox';

const Showcase = props => {
  /*********************************
   * States
   *********************************/
  const [parallaxData, setParallaxData] = useState(null);
  const [likes, setLikes] = useState([]);
  // const [category, setCategory] = useState('');
  // const [property, setProperty] = useState('');

  /*********************************
   * Effect
   *********************************/
  useEffect(() => {
    api.getAllParallaxData().then(res => {
      setParallaxData(res);
    });
  }, []);

  /*********************************
   * Event Handler
   *********************************/
  const clickLikeHander = id => {
    const likesTemp = [...likes];
    likesTemp.includes(id)
      ? likesTemp.splice(likesTemp.indexOf(id), 1)
      : likesTemp.push(id);
    setLikes(likesTemp);
  };

  /*********************************
   * Render
   *********************************/
  if (!parallaxData) {
    return (
      <div className="Showcase">
        <div className="showcase__top-container">
          <h2>Loading...</h2>
        </div>
      </div>
    );
  }
  return (
    <div className="Showcase">
      <div className="showcase__top-container">
        <h2>Scroll Down</h2>
      </div>
      <div>
        {parallaxData.map(data => {
          return (
            <ShowcaseBox
              key={data._id}
              data={data}
              onLikeClick={clickLikeHander}
              likes={likes}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Showcase;
