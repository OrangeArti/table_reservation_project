import React, { useState } from "react";
import Calendar from "./Calendar";
import "../styles/form.css";

const Form = ({ availableTimes, dispatch, submitForm }) => {

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
    }))
      dispatch({ type: "UPDATE_TIMES", payload: date });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (name === "firstName") {
      setErrors({
        ...errors,
        firstName: validateFirstName(value),
      });
    }
    if (name === "lastName") {
      setErrors({
        ...errors,
        lastName: validateLastName(value),
      });
    }
    if (name === "email") {
      console.log("Email Input:", value);
      setErrors({
        ...errors,
        email: validateEmail(value),
      });
    }
  };

  const guestsOptions = Array.from({ length: 10 }, (_, index) => index + 1);
  const occasions = ["Birthday", "Anniversary", "Business Meeting", "Casual Dinner"];

  const validateFirstName = (value) => {
    return value.length >= 3 ? "" : "First name must be at least 3 characters long";
  };

  const validateLastName = (value) => {
    return value.length >= 2 ? "" : "Last name must be at least 2 characters long";
  };

  const validateEmail = (value) => {
    const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailPattern.test(value) ? "" : "Enter a valid email address";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!selectedDate) {
      newErrors.selectedDate = "Please select a date.";
    }
    if (!formData.firstName || formData.firstName.length < 3) {
      newErrors.firstName = "First name must be at least 3 characters long";
    }
    if (!formData.lastName || formData.lastName.length < 2) {
      newErrors.lastName = "Last name must be at least 2 characters long";
    }
    if (!formData.email || validateEmail(formData.email)) {
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

    submitForm(formData);
  };

  return (
    <form 
      className="reservation-form" 
      onSubmit={handleSubmit} 
      noValidate
      aria-label="Reservation Form"
    >
      <div className="calendar-container">
        <Calendar 
          selectedDate={selectedDate} 
          setSelectedDate={handleDateChange} 
          aria-label="Calendar for date selection"
        />
        {errors.selectedDate && <p className="error" role="alert">{errors.selectedDate}</p>}
      </div>
      <div className="dropdown-container">
       
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
        {errors.hour && <p className="error" role="alert">{errors.hour}</p>}
       
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
        {errors.guests && <p className="error" role="alert">{errors.guests}</p>}
       
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
        {errors.occasion && <p className="error" role="alert">{errors.occasion}</p>}
      </div>

      <div className="required-fields">
        <fieldset>
          <legend>* Required</legend>
          
          <label htmlFor="firstName">First Name</label>
          <input 
            type="text" 
            id="firstName"
            name="firstName" 
            value={formData.firstName} 
            onChange={handleChange} 
            required 
            aria-required="true"
          />
          {errors.firstName && <p className="error" role="alert">{errors.firstName}</p>}
          
          <label htmlFor="lastName">Last Name</label>
          <input 
            type="text" 
            id="lastName"
            name="lastName" 
            value={formData.lastName} 
            onChange={handleChange} 
            required 
            aria-required="true"
          />
          {errors.lastName && <p className="error" role="alert">{errors.lastName}</p>}
         
          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            id="email"
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            required 
            aria-required="true"
          />
          {errors.email && <p className="error" role="alert">{errors.email}</p>}
        </fieldset>
      </div>
     
     <div className="optional-fields">
        <fieldset>
          <legend>Optional</legend>
          
          <label htmlFor="phone">Phone Number</label>
          <input 
            type="tel" 
            id="phone"
            name="phone" 
            value={formData.phone} 
            onChange={handleChange} 
          />
          
          <label htmlFor="comments">Comments</label>
          <textarea 
            id="comments"
            name="comments" 
            value={formData.comments} 
            onChange={handleChange} 
            rows="3" 
          />
        </fieldset>
      </div>
      <button type="submit" className="submit-btn">Reserve Table</button>
    </form>
  );
};

export default Form;