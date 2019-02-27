import React, { useState, useEffect } from 'react';
import api from '../../api';
import ShowcaseBox from '../ShowcaseBox';

const Showcase = props => {
  const [parallaxData, setParallaxData] = useState(null);
  const [category, setCategory] = useState('');
  const [property, setProperty] = useState('');

  useEffect(() => {
    api.getAllParallaxData().then(res => {
      setParallaxData(res);
    });
  }, []);

  if (!parallaxData) {
    return (
      <div className="Showcase">
        <div className="showcase__scroll-container">
          <h2>Loading...</h2>
        </div>
      </div>
    );
  }
  return (
    <div className="Showcase">
      <div className="showcase__scroll-container">
        <h2>Scroll Down</h2>
      </div>
      <div>
        {parallaxData.map(data => {
          return <ShowcaseBox key={data._id} data={data} />;
        })}
      </div>
    </div>
  );
};

export default Showcase;
