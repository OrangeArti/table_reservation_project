import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Reservation from "./pages/Reservation";
import Nav from "./components/Nav";
import ConfirmedBooking from './pages/ConfirmedBooking';
import Footer from "./components/Footer";
import Header from "./components/Header";
import "./styles/styles.css";




function App() {
  return (
    <Router>
      {/* IMPROVED: Added better ARIA labeling */}
      <div className="app-container" role="application" aria-label="Little Lemon Restaurant">
        <Header />
        <Nav />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/reservation" element={<Reservation />} />
            <Route path="/confirmed-booking" element={<ConfirmedBooking />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;