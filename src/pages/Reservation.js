/* global fetchAPI, submitAPI */
import React, { useReducer } from "react";
import { useNavigate } from "react-router-dom";
import Form from "../components/Form";

const initializeTimes = () => {
  const today = new Date();
    return fetchAPI(today);
};

 const updateTimes = (state, action) => {
    if (action.type === "UPDATE_TIMES") {
        const selectedDate = new Date(action.payload);
        return fetchAPI(selectedDate);
    }
    return state;
};

const Reservation = () => {
    const navigate = useNavigate();
    const [availableTimes, dispatch] = useReducer(updateTimes, initializeTimes());

    const submitForm = (formData) => {
      const success = submitAPI(formData);
      if (success) {
        navigate("/confirmed-booking");
      } else {
        alert("Something went wrong, please try again later!");
      }
    };

    return (
        <main aria-label="Main content of reservation page">
            <h1>Reserve a Table</h1>
            <Form availableTimes={availableTimes} dispatch={dispatch} submitForm={submitForm}/>
        </main>
    );
};

export default Reservation;
export { initializeTimes, updateTimes };