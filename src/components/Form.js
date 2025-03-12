import React, { useState } from "react";
import Calendar from "./Calendar";
import "../styles/form.css";

const Form = ({ availableTimes, dispatch, submitForm, isSubmitting, submissionError }) => {
  const [selectedDate, setSelectedDate] = useState(null);

  const [formData, setFormData] = useState({
    hour: '',
    guests: '',
    occasion: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    comments: '',
  });

  const [errors, setErrors] = useState({});

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setFormData((prevState) => ({
      ...prevState,
      hour: '',
    }));
    dispatch({ type: "UPDATE_TIMES", payload: date });
    
    // Clear date error if date is selected
    if (errors.selectedDate) {
      setErrors({
        ...errors,
        selectedDate: "",
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Real-time validation for better user experience
    let errorMessage = "";
    switch (name) {
      case "firstName":
        errorMessage = value.length < 3 ? "First name must be at least 3 characters long" : "";
        break;
      case "lastName":
        errorMessage = value.length < 2 ? "Last name must be at least 2 characters long" : "";
        break;
      case "email":
        const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
        errorMessage = value && !emailPattern.test(value) ? "Enter a valid email address" : "";
        break;
      case "hour":
      case "guests":
      case "occasion":
        errorMessage = value ? "" : `Please select a valid ${name}`;
        break;
      default:
        // No validation for other fields on change
        break;
    }
    
    // Only update errors for the changed field
    setErrors({
      ...errors,
      [name]: errorMessage,
    });
  };

  const guestsOptions = Array.from({ length: 10 }, (_, index) => index + 1);
  const occasions = ["Birthday", "Anniversary", "Business Meeting", "Casual Dinner"];

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};

    // Comprehensive validation on submit
    if (!selectedDate) {
      newErrors.selectedDate = "Please select a date.";
    }
    
    if (!formData.firstName || formData.firstName.length < 3) {
      newErrors.firstName = "First name must be at least 3 characters long";
    }
    
    if (!formData.lastName || formData.lastName.length < 2) {
      newErrors.lastName = "Last name must be at least 2 characters long";
    }
    
    const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!formData.email || !emailPattern.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }
    
    if (!formData.hour) {
      newErrors.hour = "Please select a time slot.";
    }
    
    if (!formData.guests) {
      newErrors.guests = "Please select number of guests.";
    }
    
    if (!formData.occasion) {
      newErrors.occasion = "Please select an occasion.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Submit the complete form data
    const completeFormData = {
      ...formData,
      date: selectedDate,
    };
    
    submitForm(completeFormData);
  };

  return (
    <form 
      className="reservation-form" 
      onSubmit={handleSubmit} 
      noValidate
      aria-label="Reservation Form"
    >
      {/* Display submission error if present */}
      {submissionError && (
        <div className="submission-error" role="alert">
          {submissionError}
        </div>
      )}
      
      {/* First block - Calendar */}
      <div className="calendar-container">
        <Calendar 
          selectedDate={selectedDate} 
          setSelectedDate={handleDateChange} 
          aria-label="Calendar for date selection"
        />
        <div className="error" role="alert">{errors.selectedDate || ""}</div>
      </div>
      
      {/* Second block - Dropdowns */}
      <div className="dropdown-container">
        <h3>Reservation Details</h3>
        
        <label htmlFor="timeSlot">Time Slot</label>
        <select 
          id="timeSlot"
          name="hour" 
          value={formData.hour} 
          onChange={handleChange} 
          required
          aria-required="true"
          disabled={!selectedDate}
        >
          <option value="" disabled>Select time</option>
          {Array.isArray(availableTimes) && availableTimes.length > 0
            ? availableTimes.map((time) => (
                <option key={time} value={time}>{time}</option>
              ))
            : <option disabled>No available times</option>}
        </select>
        <div className="error" role="alert">{errors.hour || ""}</div>
       
        <label htmlFor="guestsSelect">Number of Guests</label>
        <select 
          id="guestsSelect"
          name="guests" 
          value={formData.guests} 
          onChange={handleChange} 
          required
          aria-required="true"
        >
          <option value="" disabled>Select guests</option>
          {guestsOptions.map((num) => (
            <option key={num} value={num}>{num}</option>
          ))}
        </select>
        <div className="error" role="alert">{errors.guests || ""}</div>
       
        <label htmlFor="occasionSelect">Occasion</label>
        <select 
          id="occasionSelect"
          name="occasion" 
          value={formData.occasion} 
          onChange={handleChange} 
          required
          aria-required="true"
        >
          <option value="" disabled>Select an occasion</option>
          {occasions.map((occasion) => (
            <option key={occasion} value={occasion}>{occasion}</option>
          ))}
        </select>
        <div className="error" role="alert">{errors.occasion || ""}</div>
      </div>

      {/* Third block - Required Fields */}
      <div className="required-fields">
        <fieldset>
          <legend>Required Information</legend>
          
          <label htmlFor="firstName">First Name</label>
          <input 
            type="text" 
            id="firstName"
            name="firstName" 
            value={formData.firstName} 
            onChange={handleChange} 
            required 
            aria-required="true"
            placeholder="Enter your first name"
          />
          <div className="error" role="alert">{errors.firstName || ""}</div>
          
          <label htmlFor="lastName">Last Name</label>
          <input 
            type="text" 
            id="lastName"
            name="lastName" 
            value={formData.lastName} 
            onChange={handleChange} 
            required 
            aria-required="true"
            placeholder="Enter your last name"
          />
          <div className="error" role="alert">{errors.lastName || ""}</div>
         
          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            id="email"
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            required 
            aria-required="true"
            placeholder="your.email@example.com"
          />
          <div className="error" role="alert">{errors.email || ""}</div>
        </fieldset>
      </div>
     
      {/* Fourth block - Optional Fields */}
      <div className="optional-fields">
        <fieldset>
          <legend>Optional Information</legend>
          
          <label htmlFor="phone">Phone Number</label>
          <input 
            type="tel" 
            id="phone"
            name="phone" 
            value={formData.phone} 
            onChange={handleChange}
            placeholder="(123) 456-7890"
          />
          
          <label htmlFor="comments">Special Requests</label>
          <textarea 
            id="comments"
            name="comments" 
            value={formData.comments} 
            onChange={handleChange} 
            rows="4"
            placeholder="Any special requests or dietary requirements?"
          />
        </fieldset>
      </div>
      
      {/* Submit Button - Centered at bottom */}
      <button 
        type="submit" 
        className="submit-btn" 
        disabled={isSubmitting}
        aria-label="Submit reservation request"
      >
        {isSubmitting ? "Submitting..." : "Reserve Table"}
      </button>
    </form>
  );
};

export default Form;