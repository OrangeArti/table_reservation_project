// src/components/Hero.js
import React from "react";
import { Link } from "react-router-dom";
import restauranfood from "../assets/restauranfood.jpg";

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-text">
        <h1>Little Lemon</h1>
        <h2>Chicago</h2>
        <p>Savor the vibrant taste of Mediterranean cuisine in our inviting family restaurant, where every dish is prepared with passion and authenticity.</p>
        <Link to="/reservation">
          <button>Reserve a table</button>
        </Link>
      </div>
      <div className="hero-image">
        <img src={restauranfood} alt="Little Lemon Restaurant" />
      </div>
    </section>
  );
};

export default Hero;