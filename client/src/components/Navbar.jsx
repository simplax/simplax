import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import api from "../api";

export default function Navbar() {
  useEffect(() => { });
  return (
    <div className="Navbar">
      <nav className="navbar navbar-expand-md navbar-dark pl-3">
        <div className="top-logo-container">
          <img
            id="layer4Top"
            className="landing-logoTop"
            src="/images/logo-layer-4.svg"
            alt="logo"
          />
          <img
            id="layer3Top"
            className="landing-logoTop"
            src="/images/logo-layer-3.svg"
            alt="logo"
          />
          <img
            id="layer2Top"
            className="landing-logoTop"
            src="/images/logo-layer-2.svg"
            alt="logo"
          />
          <img
            id="layer1Top"
            className="landing-logoTop"
            src="/images/logo-layer-1.svg"
            alt="logo"
          />
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarToggler"
          aria-controls="navbarToggler"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarToggler">
          <ul className="navbar-nav mt-2 mt-lg-0">
            <li className="nav-item home-link">
              <NavLink className="nav-link" exact to="/">
                Home
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/explore">
                Explore
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/customize">
                Customize
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/tutorial">
                Tutorial
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/blog">
                Blog
              </NavLink>
            </li>
            {api.isAdmin() && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/new-blog">
                  New Blog
                </NavLink>
              </li>
            )}
            {!api.isLoggedIn() && (
              <li className="nav-item github-login-link">
                <a className="nav-link" href={api.service.defaults.baseURL + "/github-login"}>
                  <i className="fab fa-3x fa-github" />
                </a>
              </li>
            )}
            {/* {api.isLoggedIn() && (
              <li className="nav-item github-login-link">
                <Link className="nav-link " to="/" onClick={() => api.logout()}>
                  Logout
                </Link>
              </li>
            )} */}
            {api.isLoggedIn() && (
              <li className="nav-item profile-image-link">
                <Link className="nav-link" to="/customize" onClick={() => api.logout()}>
                  <img src={api.getLocalStorageUser().imageUrl} alt="" className="profile-image" />
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
}
