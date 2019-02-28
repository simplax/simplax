import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api';
import Plx from 'react-plx';
import ShowcaseBox from '../ShowcaseBox';
import TextTranslateX from '../animations/TextTranslateX';

const Showcase = props => {
  /*********************************
   * States
   *********************************/
  const [plxDataTransform, setPlxDataTransform] = useState(null);
  const [plxDataColors, setPlxDataColors] = useState(null);
  const [plxDataFilter, setPlxDataFilter] = useState(null);
  const [likes, setLikes] = useState([]);
  const [property, setProperty] = useState('');
  const [propertyAnimation, setPropertyAnimation] = useState(false);

  /*********************************
   * Effects
   *********************************/
  // componentDidMount
  // GET all parallaxData and filter by category
  useEffect(() => {
    api.getAllParallaxData().then(allPlxData => {
      let transforms = allPlxData.filter(data => {
        return data.category === 'Transform';
      });
      setPlxDataTransform(transforms);
      let colors = allPlxData.filter(data => {
        return data.category === 'Colors';
      });
      setPlxDataColors(colors);
      let filters = allPlxData.filter(data => {
        return data.category === 'CSS Filter';
      });
      setPlxDataFilter(filters);
    });
  }, []);

  /*********************************
   * Event Handler
   *********************************/
  const handleLikeClick = id => {
    const likesTemp = [...likes];
    likesTemp.includes(id)
      ? likesTemp.splice(likesTemp.indexOf(id), 1)
      : likesTemp.push(id);
    setLikes(likesTemp);
  };

  const handlePlxStart = property => {
    setProperty(property);
    setPropertyAnimation(true);
  };

  const handlePlxEnd = property => {
    setProperty(property);
    setPropertyAnimation(false);
  };

  /*********************************
   * parallaxData
   *********************************/
  const categoryParallaxData = [
    {
      start: 'self',
      end: 'self',
      endOffset: '40vh',
      properties: [
        {
          startValue: 1,
          endValue: 2,
          property: 'scale'
        }
      ]
    },
    {
      start: 'self',
      startOffset: '60vh',
      end: 'self',
      endOffset: '100vh',
      properties: [
        {
          startValue: 2,
          endValue: 1,
          property: 'scale'
        }
      ]
    }
  ];

  /*********************************
   * Render
   *********************************/
  if (!plxDataTransform || !plxDataColors || !plxDataFilter) {
    return (
      <div className="Showcase">
        <div className="showcase__top-container">
          <h2 className="category">Loading...</h2>
        </div>
      </div>
    );
  }
  return (
    <div id="Showcase" className="Showcase">
      <div className="scroll-down-container">
        <h2>Scroll Down</h2>
      </div>

      {/* Transform */}
      <div className="category-container">
        <Plx parallaxData={categoryParallaxData}>
          <h2 className="category">TRANSFORM</h2>
        </Plx>
      </div>
      <div>
        {plxDataTransform.map(data => {
          return (
            <ShowcaseBox
              key={data._id}
              data={data}
              onLikeClick={handleLikeClick}
              onPlxStart={handlePlxStart}
              onPlxEnd={handlePlxEnd}
              likes={likes}
            />
          );
        })}
      </div>

      {/* Colors */}
      <div className="category-container">
        <h2 className="category">COLORS</h2>
      </div>
      <div>
        {plxDataColors.map(data => {
          return (
            <ShowcaseBox
              key={data._id}
              data={data}
              onLikeClick={handleLikeClick}
              onPlxStart={handlePlxStart}
              onPlxEnd={handlePlxEnd}
              likes={likes}
            />
          );
        })}
      </div>

      {/* CSS Filter */}
      <div className="category-container">
        <h2 className="category">CSS FILTER</h2>
      </div>
      <div>
        {plxDataFilter.map(data => {
          return (
            <ShowcaseBox
              key={data._id}
              data={data}
              onLikeClick={handleLikeClick}
              onPlxStart={handlePlxStart}
              onPlxEnd={handlePlxEnd}
              likes={likes}
            />
          );
        })}
      </div>

      <div className="scroll-down-container" />

      {/* Customize Button */}
      <div>
        <Link
          to={{
            pathname: '/customize',
            state: {
              likes
            }
          }}
          className="link customize-btn"
        >
          Customize
        </Link>
      </div>

      {/* Display Property Name */}
      <div className="test">
        <TextTranslateX text={property} isEnter={propertyAnimation} />
      </div>
    </div>
  );
};

export default Showcase;
