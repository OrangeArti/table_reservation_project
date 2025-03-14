import React from "react";
import bruchetta from "../assets/bruchetta.svg";
import greekSalad from "../assets/greeksalad.jpg";
import lemonDessert from "../assets/lemondessert.jpg";

const Highlights = () => {
  return (
    <section className="highlights">
      <h2>Specials</h2>
      <div className="specials-container">
        <div className="special-card">
          <img src={greekSalad} alt="Special 1" />
          <h3>Greek Salad</h3>
          <p>Salad with feta cheese</p>
          <button>Order delivery</button>
        </div>
        <div className="special-card">
          <img src={bruchetta} alt="Special 2" />
          <h3>Bruchetta</h3>
          <p>Bread with tomatoes</p>
          <button>Order delivery</button>
        </div>
        <div className="special-card">
          <img src={lemonDessert} alt="Special 3" />
          <h3>Lemon dessert</h3>
          <p>Lemon cake</p>
          <button>Order delivery</button>
        </div>
      </div>
    </section>
  );
};

export default Highlights;