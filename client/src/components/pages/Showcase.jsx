import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api';
import ShowcaseBox from '../ShowcaseBox';
import TextTranslateX from '../animations/TextTranslateX';

const Showcase = props => {
  /*********************************
   * States
   *********************************/
  const [parallaxData, setParallaxData] = useState(null);
  const [plxDataTransform, setPlxDataTransform] = useState(null);
  const [plxDataColors, setPlxDataColors] = useState(null);
  const [plxDataFilter, setPlxDataFilter] = useState(null);
  const [likes, setLikes] = useState([]);
  // const [category, setCategory] = useState('');
  const [property, setProperty] = useState('');
  const [scrollPos, setScrollPos] = useState(0);
  const [animationState, setAnimationState] = useState('hidden');

  /*********************************
   * Effects
   *********************************/
  // componentDidMount
  useEffect(() => {
    api.getAllParallaxData().then(allPlxData => {
      setParallaxData(allPlxData);
    });

    // window.onscroll = handleScroll;
  }, []);

  // transform
  useEffect(() => {
    let transforms =
      parallaxData &&
      parallaxData.filter(data => {
        return data.category === 'Transform';
      });
    setPlxDataTransform(transforms);
  }, [parallaxData]);

  // colors
  useEffect(() => {
    let colors =
      parallaxData &&
      parallaxData.filter(data => {
        return data.category === 'Colors';
      });
    setPlxDataColors(colors);
  }, [parallaxData]);

  // filters
  useEffect(() => {
    let filters =
      parallaxData &&
      parallaxData.filter(data => {
        return data.category === 'CSS Filter';
      });
    setPlxDataFilter(filters);
  }, [parallaxData]);

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
    setAnimationState('enter');
  };

  const handlePlxEnd = property => {
    setProperty(property);
    setAnimationState('exit');
  };

  // const handleScroll = e => {
  //   console.log(e.currentTarget.scrollY);
  //   let prevScrollPos = scrollPos;
  //   let nowScrollPos = e.currentTarget.scrollY;

  //   setScrollPos(e.currentTarget.scrollY);

  //   if (nowScrollPos - prevScrollPos > 1000) {
  //     console.log('too fast!!!!!!');
  //   }

  // };

  /*********************************
   * Render
   *********************************/
  if (!plxDataTransform || !plxDataColors || !plxDataFilter) {
    return (
      <div className="Showcase">
        <div className="showcase__top-container">
          <h2>Loading...</h2>
        </div>
      </div>
    );
  }
  return (
    <div id="Showcase" className="Showcase">
      <div className="showcase__top-container showcase__top-container--scroll">
        <h2>Scroll Down</h2>
      </div>

      {/* Transform */}
      <div className="showcase__top-container showcase__top-container--category">
        <h2>Transform</h2>
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
      <div className="showcase__top-container showcase__top-container--category">
        <h2>Colors</h2>
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
      <div className="showcase__top-container showcase__top-container--category">
        <h2>CSS Filter</h2>
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

      <div className="showcase__top-container showcase__top-container--scroll" />

      {/* Customize Button */}
      <div>
        <Link
          to={{
            pathname: '/customize',
            state: {
              likes: { likes }
            }
          }}
          className="link customize-btn"
        >
          Customize
        </Link>
      </div>

      {/* Display Property Name */}
      <div className="test">
        <TextTranslateX text={property} animationState={animationState} />
      </div>
    </div>
  );
};

export default Showcase;
