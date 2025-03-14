// src/components/About.js
import React from "react";
import restaurant from "../assets/restaurant.jpg";

const About = () => {
  return (
    <section id="about" className="about">
      <div className="about-text">
        <h2>About Little Lemon</h2>
        <p>Located in the heart of Chicago, Little Lemon is a
          family-run restaurant offering an authentic taste of Mediterranean cuisine.
          We pride ourselves on using fresh, locally-sourced ingredients to create dishes that blend traditional recipes with a modern twist.</p>
        <p>Our warm and inviting atmosphere is the perfect backdrop for enjoying a meal with family and friends.
          Join us and experience a culinary journey filled with vibrant flavors and exceptional service.</p>
      </div>
      <img src={restaurant} alt="Little Lemon Restaurant" className="about-image" />
    </section>
  );
};

export default About;