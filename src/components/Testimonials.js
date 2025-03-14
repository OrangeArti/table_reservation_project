import React from "react";

const Testimonials = () => {
  return (
    <section className="testimonials">
      <h2>Testimonials</h2>
      <div className="testimonial-container">
        <div className="testimonial-card">
          <p>"The service was excellent and the food was delicious!"</p>
          <h3>Emily R.</h3>
        </div>
        <div className="testimonial-card">
          <p>"A wonderful dining experience with a warm, welcoming atmosphere."</p>
          <h3>Michael T.</h3>
        </div>
        <div className="testimonial-card">
          <p>"I loved the authentic Mediterranean flavors and friendly staff."</p>
          <h3>Sarah L.</h3>
        </div>
        <div className="testimonial-card">
          <p>"The perfect spot for family dinners. Highly recommended!"</p>
          <h3>David W.</h3>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;