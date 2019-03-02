import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Plx from 'react-plx';
import { useInView } from 'react-intersection-observer';
import ScrollableAnchor, { configureAnchors } from 'react-scrollable-anchor';

import api from '../../api';
import ShowcaseBox from '../ShowcaseBox';
import CategoryNavbar from '../CategoryNavbar';
import TextTranslateX from '../animations/TextTranslateX';

const Showcase = ({ onLikeClick, likes, onCustomizeClick }) => {
  /*********************************
   * States
   *********************************/
  const [plxDataTransform, setPlxDataTransform] = useState(null);
  const [plxDataColors, setPlxDataColors] = useState(null);
  const [plxDataFilter, setPlxDataFilter] = useState(null);
  const [property, setProperty] = useState('');
  const [propertyAnimation, setPropertyAnimation] = useState(false);
  const [category, setCategory] = useState('');
  const [viewportHeight, setViewportHeight] = useState(0);
  // Intersection Observer
  const [categoryNavRef, categoryNavInView] = useInView({});

  /*********************************
   * Effects
   *********************************/
  // componentDidMount
  // GET all parallaxData and filter by category
  useEffect(() => {
    setViewportHeight(window.innerHeight);

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

  useEffect(() => {
    if (categoryNavInView) setCategory('');
  }, [categoryNavInView]);

  /*********************************
   * Event Handler
   *********************************/
  const handlePropertyPlxStart = property => {
    setProperty(property);
    setPropertyAnimation(true);
  };

  const handlePropertyPlxEnd = property => {
    setProperty(property);
    setPropertyAnimation(false);
  };

  const handleCategoryPlxStart = category => {
    setCategory(category);
    setProperty('');
    setPropertyAnimation(false);
  };

  const handleCategoryPlxEnd = nextCategory => {
    setCategory(nextCategory);
    setProperty('');
    setPropertyAnimation(false);
  };

  /*********************************
   * parallaxData for category
   *********************************/
  const categoryParallaxData = [
    {
      start: 'self',
      end: 'self',
      endOffset: '40vh',
      properties: [
        {
          startValue: 0.8,
          endValue: 1.5,
          property: 'scale'
        },
        {
          startValue: 0,
          endValue: 1,
          property: 'opacity'
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
          startValue: 1.5,
          endValue: 0.8,
          property: 'scale'
        },
        {
          startValue: 1,
          endValue: 0,
          property: 'opacity'
        }
      ]
    }
  ];

  /*********************************
   * Scrollable Anchor Configuration
   *********************************/
  configureAnchors({ offset: viewportHeight / 2.5, scrollDuration: 800 });

  /*********************************
   * Render
   *********************************/
  if (!plxDataTransform || !plxDataColors || !plxDataFilter) {
    return (
      <div className="Showcase">
        <div className="scroll-down-container">
          <h2 className="category">Loading...</h2>
        </div>
      </div>
    );
  }
  return (
    <div id="Showcase" className="Showcase">
      {/* Scroll Down */}
      <div className="scroll-down-container">
        <h2>Scroll Down</h2>
      </div>

      {/* Category Navbar */}
      <div ref={categoryNavRef} className="container-50vh" />
      {!categoryNavInView && <CategoryNavbar categoryActive={category} />}
      <div className="container-100vh" />

      {/* Transform */}
      <ScrollableAnchor id="transform">
        <div className="category-container">
          <Plx
            parallaxData={categoryParallaxData}
            onPlxStart={() => handleCategoryPlxStart('transform')}
          >
            <h2 className="category">TRANSFORM</h2>
          </Plx>
        </div>
      </ScrollableAnchor>
      <div>
        {plxDataTransform.map(data => {
          return (
            <ShowcaseBox
              key={data._id}
              data={data}
              onLikeClick={onLikeClick}
              onPropertyPlxStart={handlePropertyPlxStart}
              onPropertyPlxEnd={handlePropertyPlxEnd}
              likes={likes}
            />
          );
        })}
      </div>

      {/* Colors */}
      <ScrollableAnchor id="colors">
        <div className="category-container">
          <Plx
            parallaxData={categoryParallaxData}
            onPlxStart={() => handleCategoryPlxStart('colors')}
          >
            <h2 className="category">COLORS</h2>
          </Plx>
        </div>
      </ScrollableAnchor>
      <div>
        {plxDataColors.map(data => {
          return (
            <ShowcaseBox
              key={data._id}
              data={data}
              onLikeClick={onLikeClick}
              onPropertyPlxStart={handlePropertyPlxStart}
              onPropertyPlxEnd={handlePropertyPlxEnd}
              likes={likes}
            />
          );
        })}
      </div>

      {/* CSS Filter */}
      <ScrollableAnchor id="css-filter">
        <div className="category-container">
          <Plx
            parallaxData={categoryParallaxData}
            onPlxStart={() => handleCategoryPlxStart('css-filter')}
          >
            <h2 className="category">CSS FILTER</h2>
          </Plx>
        </div>
      </ScrollableAnchor>
      <div>
        {plxDataFilter.map(data => {
          return (
            <ShowcaseBox
              key={data._id}
              data={data}
              onLikeClick={onLikeClick}
              onPropertyPlxStart={handlePropertyPlxStart}
              onPropertyPlxEnd={handlePropertyPlxEnd}
              likes={likes}
            />
          );
        })}
      </div>

      <div className="scroll-down-container" />

      {/* Display Property Name */}
      <div className="property-text">
        <TextTranslateX text={property} isEnter={propertyAnimation} />
      </div>

      <button
        type="button"
        className="btn btn-customize"
        onClick={onCustomizeClick}
      >
        Customize
      </button>
    </div>
  );
};

export default Showcase;
