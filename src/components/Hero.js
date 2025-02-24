// src/components/Hero.js
import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-text">
        <h1>Little Lemon</h1>
        <h2>Chicago</h2>
        <p>Sample text</p>
        <Link to="/reservation">
          <button>Reserve a table</button>
        </Link>
      </div>
      <div className="hero-image">
        <img src="path/to/your/image.jpg" alt="Little Lemon Restaurant" />
      </div>
    </section>
  );
};

export default Hero;