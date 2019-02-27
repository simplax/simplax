import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import api from "../api";

export default function Navbar() {
  useEffect(() => {
    api.logout();
  });
  return (
    <div className="Navbar">
      <nav className="navbar navbar-expand-lg navbar-dark bg-transparent">
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
          aria-label="Toggle navigation">
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
                About us
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/showcase">
                Showcase
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
            {!api.isLoggedIn() && (
              <li>
                <NavLink className="nav-link" to="/signup">
                  Signup
                </NavLink>
              </li>
            )}
            {!api.isLoggedIn() && (
              <li>
                <NavLink className="nav-link" to="/login">
                  Login
                </NavLink>
              </li>
            )}
            {api.isLoggedIn() && (
              <NavLink className="nav-link" to="/" onClick={() => useEffect()}>
                Logout
              </NavLink>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
}