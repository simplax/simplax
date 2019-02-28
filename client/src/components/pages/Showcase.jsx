import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../api";
import ShowcaseBox from "../ShowcaseBox";

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
  // const [property, setProperty] = useState('');

  /*********************************
   * Effect
   *********************************/
  useEffect(() => {
    api.getAllParallaxData().then(allPlxData => {
      setParallaxData(allPlxData);
    });
  }, []);

  useEffect(() => {
    let transforms =
      parallaxData &&
      parallaxData.filter(data => {
        return data.category == "Transform";
      });
    setPlxDataTransform(transforms);
  }, parallaxData);

  useEffect(() => {
    let colors =
      parallaxData &&
      parallaxData.filter(data => {
        return data.category == "Colors";
      });
    setPlxDataColors(colors);
  }, parallaxData);

  useEffect(() => {
    let filters =
      parallaxData &&
      parallaxData.filter(data => {
        return data.category == "CSS Filter";
      });
    setPlxDataFilter(filters);
  }, parallaxData);

  /*********************************
   * Event Handler
   *********************************/
  const handleLikeClick = id => {
    const likesTemp = [...likes];
    likesTemp.includes(id) ? likesTemp.splice(likesTemp.indexOf(id), 1) : likesTemp.push(id);
    setLikes(likesTemp);
  };

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
    <div className="Showcase">
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
            <ShowcaseBox key={data._id} data={data} onLikeClick={handleLikeClick} likes={likes} />
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
            <ShowcaseBox key={data._id} data={data} onLikeClick={handleLikeClick} likes={likes} />
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
            <ShowcaseBox key={data._id} data={data} onLikeClick={handleLikeClick} likes={likes} />
          );
        })}
      </div>

      {/* Customize Button */}
      <div>
        <Link
          to={{
            pathname: "/customize",
            state: {
              likes
            }
          }}
          className="link customize-btn">
          Customize
        </Link>
      </div>
    </div>
  );
};

export default Showcase;
