import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ConfirmedBooking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Use the entire location.state as reservation details (if available)
  // If no reservation data is passed, display a fallback message instead of redirecting immediately
  const reservationDetails = location.state || {};
  
  if (Object.keys(reservationDetails).length === 0) {
    return (
      <div className="confirmed-booking">
        <h1>No Reservation Details Found</h1>
        <p>Please make a reservation before viewing this page.</p>
        <button onClick={() => navigate('/')}>Return Home</button>
      </div>
    );
  }
  
  return (
    <div>
      <div className="confirmed-booking">
        <h1>Your reservation has been confirmed</h1>
        <p>Thank you for your reservation! We look forward to serving you.</p>
      
        <div className="reservation-details">
          <h2>Reservation Details</h2>
          <ul>
            <li>
              <strong>Date:</strong>{" "}
              {reservationDetails.date ? new Date(reservationDetails.date).toLocaleDateString() : "N/A"}
            </li>
            <li>
              <strong>Time:</strong>{" "}
              {reservationDetails.hour || "N/A"}
            </li>
            <li>
              <strong>Party Size:</strong>{" "}
              {reservationDetails.guests ? `${reservationDetails.guests} guests` : "N/A"}
            </li>
            <li>
              <strong>Occasion:</strong>{" "}
              {reservationDetails.occasion || "N/A"}
            </li>
            <li>
              <strong>Reserved By:</strong>{" "}
              {(reservationDetails.firstName || "N/A") + " " + (reservationDetails.lastName || "N/A")}
            </li>
            <li>
              <strong>Email:</strong>{" "}
              {reservationDetails.email || "N/A"}
            </li>
            <li>
              <strong>Phone:</strong>{" "}
              {reservationDetails.phone || "N/A"}
            </li>
            <li>
              <strong>Comments:</strong>{" "}
              {reservationDetails.comments || "N/A"}
            </li>
          </ul>
        </div>
      </div>
        <div className="contact-info">
          <p>If you need to make any changes to your reservation, please contact us at:</p>
          <p>Phone: (123) 456-7890</p>
          <p>Email: reservations@littlelemon.com</p>
        </div>
    </div>
  );
};

export default ConfirmedBooking;