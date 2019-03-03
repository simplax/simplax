import React, { useState, useEffect, useRef } from 'react';
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
  // fix
  const [plxDataTransform, setPlxDataTransform] = useState(null);
  const [plxDataColors, setPlxDataColors] = useState(null);
  const [plxDataFilter, setPlxDataFilter] = useState(null);
  const [transformProps, setTransformProps] = useState([]);
  const [colorsProps, setColorsProps] = useState([]);
  const [cssFilterProps, setCSSFilterProps] = useState([]);
  const [viewportHeight, setViewportHeight] = useState(0);

  // update
  const [property, setProperty] = useState('');
  const [propertyAnimation, setPropertyAnimation] = useState(false);
  const [category, setCategory] = useState('');

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
      // transform
      let transformsPlx = allPlxData.filter(data => {
        return data.category === 'transform';
      });
      let transformsProps = allPlxData
        .filter(data => {
          return data.category === 'transform';
        })
        .map(data => {
          return data.property;
        });
      setPlxDataTransform(transformsPlx);
      setTransformProps(transformsProps);

      // colors
      let colorsPlx = allPlxData.filter(data => {
        return data.category === 'colors';
      });
      let colorsProps = allPlxData
        .filter(data => {
          return data.category === 'colors';
        })
        .map(data => {
          return data.property;
        });
      setPlxDataColors(colorsPlx);
      setColorsProps(colorsProps);

      // css-filter
      let filtersPlx = allPlxData.filter(data => {
        return data.category === 'css-filter';
      });
      let filtersProps = allPlxData
        .filter(data => {
          return data.category === 'css-filter';
        })
        .map(data => {
          return data.property;
        });
      setPlxDataFilter(filtersPlx);
      setCSSFilterProps(filtersProps);
    });
  }, []);

  useEffect(() => {
    if (categoryNavInView) {
      setCategory('');
      setProperty('');
    }
  }, [categoryNavInView]);

  /*********************************
   * Event Handler
   *********************************/
  const handlePropertyPlxStart = (property, category) => {
    setProperty(property);
    setPropertyAnimation(true);
    setCategory(category);
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

  /*********************************
   * Functions
   *********************************/
  // set all properties to category navbar
  const setPropertyNames = category => {
    switch (category) {
      case 'transform':
        return transformProps;
      case 'colors':
        return colorsProps;
      case 'css-filter':
        return cssFilterProps;
    }
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
  configureAnchors({ offset: viewportHeight / 2.5, scrollDuration: 1000 });

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
      {!categoryNavInView && (
        <CategoryNavbar
          categoryActive={category}
          properties={setPropertyNames(category)}
          propertyActive={property}
        />
      )}
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

      {/* Customize Button */}
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
