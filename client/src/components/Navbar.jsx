import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import api from '../api';
import ScrollableAnchor from 'react-scrollable-anchor';

export default function Navbar() {
  useEffect(() => {});
  return (
    <div className="Navbar">
      <nav className="navbar navbar-expand-md navbar-dark bg-transparent container justify-content-center">
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
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            <li className="nav-item">
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
              <li>
                <a
                  className="github-login-link"
                  href={api.service.defaults.baseURL + '/github-login'}
                >
                  Login with Github
                </a>
              </li>
            )}
            {api.isLoggedIn() && (
              <NavLink className="nav-link" to="/" onClick={() => api.logout()}>
                Logout
              </NavLink>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
}
