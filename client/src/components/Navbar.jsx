import React, { useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import api from '../api';

export default function Navbar() {
  useEffect(() => {});
  return (
    <div className="Navbar">
      <nav className="navbar navbar-expand-md navbar-dark">
        <NavLink className="navbar-brand" exact to="/">
          Simplax Logo
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarToggler"
          aria-controls="navbarToggler"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
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
              <NavLink className="nav-link" to="/about-us">
                About Us
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
              <NavLink className="nav-link" to="/blog">
                Blog
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/new-blog">
                New Blog
              </NavLink>
            </li>
            {!api.isLoggedIn() && (
              <li className="nav-item github-login-link">
                <a
                  className="nav-link"
                  href={api.service.defaults.baseURL + '/github-login'}
                >
                  <i class="fab fa-3x fa-github" />
                </a>
              </li>
            )}
            {api.isLoggedIn() && (
              <li className="nav-item github-login-link">
                <Link className="nav-link " to="/" onClick={() => api.logout()}>
                  Logout
                </Link>
              </li>
            )}
            {api.isLoggedIn() && (
              <Link
                className="nav-link"
                to="/customize"
                onClick={() => api.logout()}
              >
                <img
                  src={api.getLocalStorageUser().imageUrl}
                  alt=""
                  className="profile-image"
                />
              </Link>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
}
