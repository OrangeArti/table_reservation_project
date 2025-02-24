// src/components/Highlights.js
import React from "react";

const Highlights = () => {
  return (
    <section className="highlights">
      <h2>Specials</h2>
      <div className="specials-container">
        <div className="special-card">
          <img src="path/to/image1.jpg" alt="Special 1" />
          <h3>Greek Salad</h3>
          <p>Sample text</p>
          <button>Order delivery</button>
        </div>
        <div className="special-card">
          <img src="path/to/image2.jpg" alt="Special 2" />
          <h3>Greek Salad</h3>
          <p>Sample text</p>
          <button>Order delivery</button>
        </div>
        <div className="special-card">
          <img src="path/to/image3.jpg" alt="Special 3" />
          <h3>Greek Salad</h3>
          <p>Sample text</p>
          <button>Order delivery</button>
        </div>
      </div>
    </section>
  );
};

export default Highlights;