// src/pages/Reservation.js
import React from "react";
import Calendar from "../components/Calendar";
import Form from "../components/Form";

const Reservation = () => {
  return (
    <main>
      <h1>Make Your Reservation</h1>
      <Calendar />
      <Form />
    </main>
  );
};

export default Reservation;