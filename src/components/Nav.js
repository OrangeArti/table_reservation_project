// src/components/Nav.js
import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/reservation">Reservations</Link></li>
        <li><a href="#menu">Menu</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#login">Log In</a></li>
      </ul>
    </nav>
  );
};

export default Nav;