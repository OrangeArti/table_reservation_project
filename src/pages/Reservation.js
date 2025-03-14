/* global fetchAPI, submitAPI */
import React, { useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "../components/Form";
import "../styles/form.css";

/**
 * Initializes available times for the current date
 * @returns {Array} Array of available time slots
 */
const initializeTimes = () => {
  const today = new Date();
  // USING: fetchAPI as provided by the project
  return fetchAPI(today);
};

/**
 * Reducer function to update available times based on selected date
 * @param {Array} state - Current state (available times)
 * @param {Object} action - Action to perform
 * @returns {Array} Updated available times
 */
const updateTimes = (state, action) => {
  if (action.type === "UPDATE_TIMES") {
    // FIXED: Better date handling by ensuring we have a proper Date object
    try {
      const selectedDate = new Date(action.payload);
      // IMPROVED: Added validation to prevent errors with invalid dates
      if (isNaN(selectedDate.getTime())) {
        console.error("Invalid date provided to updateTimes");
        return state;
      }
      return fetchAPI(selectedDate);
    } catch (error) {
      console.error("Error updating times:", error);
      return state;
    }
  }
  return state;
};

const Reservation = () => {
  const navigate = useNavigate();
  const [availableTimes, dispatch] = useReducer(updateTimes, initializeTimes());
  
  // ADDED: State for handling submission status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState("");

  /**
   * Handles form submission
   * @param {Object} formData - Form data to submit
   */
  const submitForm = (formData) => {
    // IMPROVED: Added proper error handling and submission flow
    try {
      setIsSubmitting(true);
      setSubmissionError("");
      
      const success = submitAPI(formData);
      
      if (success) {
        navigate("/confirmed-booking", { state: formData });
      } else {
        setSubmissionError("Something went wrong, please try again later!");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmissionError("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main aria-label="Main content of reservation page">
      <h1 id="reservation-title">Reserve a table in Little Lemon Restaurant</h1>
      {/* IMPROVED: Passing additional props for error handling */}
      <Form 
        availableTimes={availableTimes} 
        dispatch={dispatch} 
        submitForm={submitForm}
        isSubmitting={isSubmitting}
        submissionError={submissionError}
      />
    </main>
  );
};

export default Reservation;
export { initializeTimes, updateTimes };