// src/pages/Home.js
import React from "react";
import Hero from "../components/Hero";
import Highlights from "../components/Highlights";
import Testimonials from "../components/Testimonials";
import About from "../components/About";

const Home = () => {
  return (
    <main aria-label="Main content">
      <Hero />
      <Highlights />
      <Testimonials />
      <About />
    </main>
  );
};

export default Home;