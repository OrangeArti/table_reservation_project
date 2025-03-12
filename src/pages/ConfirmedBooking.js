import React from 'react';
import { useLocation } from 'react-router-dom';

const ConfirmedBooking = () => {
  // IMPROVED: Added handling for reservation details
  const location = useLocation();
  const reservationDetails = location.state?.reservation;

  return (
    <div className="confirmed-booking">
      <h1>Your reservation has been confirmed</h1>
      <p>Thank you for your reservation! We look forward to serving you.</p>
      
      {/* ADDED: Display reservation details if available */}
      {reservationDetails && (
        <div className="reservation-details">
          <h2>Reservation Details</h2>
          <ul>
            {reservationDetails.date && (
              <li><strong>Date:</strong> {new Date(reservationDetails.date).toLocaleDateString()}</li>
            )}
            {reservationDetails.hour && (
              <li><strong>Time:</strong> {reservationDetails.hour}</li>
            )}
            {reservationDetails.guests && (
              <li><strong>Party Size:</strong> {reservationDetails.guests} guests</li>
            )}
            {reservationDetails.occasion && (
              <li><strong>Occasion:</strong> {reservationDetails.occasion}</li>
            )}
            {reservationDetails.firstName && reservationDetails.lastName && (
              <li><strong>Reserved By:</strong> {reservationDetails.firstName} {reservationDetails.lastName}</li>
            )}
          </ul>
        </div>
      )}
      
      {/* ADDED: Contact information */}
      <div className="contact-info">
        <p>If you need to make any changes to your reservation, please contact us at:</p>
        <p>Phone: (123) 456-7890</p>
        <p>Email: reservations@littlelemon.com</p>
      </div>
    </div>
  );
};

export default ConfirmedBooking;