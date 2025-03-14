// src/pages/Home.js
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Hero from "../components/Hero";
import Highlights from "../components/Highlights";
import Testimonials from "../components/Testimonials";
import About from "../components/About";

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

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