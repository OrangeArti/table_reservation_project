import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Form from './Form';

// Mock the Calendar component to simplify testing.
// When clicked, it sets a valid date.
jest.mock('./Calendar', () => {
  return function DummyCalendar(props) {
    return (
      <button onClick={() => props.setSelectedDate('2025-04-01')} aria-label="Calendar for date selection">
        {props.selectedDate || 'Select Date'}
      </button>
    );
  };
});

describe('Form Component', () => {
  const availableTimes = ['17:00', '18:00'];
  const dispatch = jest.fn();
  const submitForm = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders all input fields with correct attributes', () => {
    render(
      <Form
        availableTimes={availableTimes}
        dispatch={dispatch}
        submitForm={submitForm}
        isSubmitting={false}
        submissionError=""
      />
    );

    // Calendar (dummy) should be rendered with the correct aria-label
    const calendarButton = screen.getByLabelText(/Calendar for date selection/i);
    expect(calendarButton).toBeInTheDocument();

    // Time Slot select input
    const timeSlot = screen.getByLabelText(/Time Slot/i);
    expect(timeSlot).toHaveAttribute('id', 'timeSlot');
    expect(timeSlot).toHaveAttribute('name', 'hour');
    // Initially disabled because no date is selected
    expect(timeSlot).toBeDisabled();

    // Guests select input
    const guestsSelect = screen.getByLabelText(/Number of Guests/i);
    expect(guestsSelect).toHaveAttribute('id', 'guestsSelect');
    expect(guestsSelect).toHaveAttribute('name', 'guests');
    expect(guestsSelect).toBeRequired();

    // Occasion select input
    const occasionSelect = screen.getByLabelText(/Occasion/i);
    expect(occasionSelect).toHaveAttribute('id', 'occasionSelect');
    expect(occasionSelect).toHaveAttribute('name', 'occasion');
    expect(occasionSelect).toBeRequired();

    // First Name input
    const firstName = screen.getByLabelText(/First Name/i);
    expect(firstName).toHaveAttribute('id', 'firstName');
    expect(firstName).toHaveAttribute('name', 'firstName');
    expect(firstName).toHaveAttribute('placeholder', 'Enter your first name');
    expect(firstName).toBeRequired();

    // Last Name input
    const lastName = screen.getByLabelText(/Last Name/i);
    expect(lastName).toHaveAttribute('id', 'lastName');
    expect(lastName).toHaveAttribute('name', 'lastName');
    expect(lastName).toHaveAttribute('placeholder', 'Enter your last name');
    expect(lastName).toBeRequired();

    // Email input
    const email = screen.getByLabelText(/Email/i);
    expect(email).toHaveAttribute('id', 'email');
    expect(email).toHaveAttribute('name', 'email');
    expect(email).toHaveAttribute('placeholder', 'your.email@example.com');
    expect(email).toHaveAttribute('type', 'email');
    expect(email).toBeRequired();

    // Phone input (optional)
    const phone = screen.getByLabelText(/Phone Number/i);
    expect(phone).toHaveAttribute('id', 'phone');
    expect(phone).toHaveAttribute('name', 'phone');
    expect(phone).toHaveAttribute('placeholder', '(123) 456-7890');

    // Comments textarea (optional)
    const comments = screen.getByLabelText(/Special Requests/i);
    expect(comments).toHaveAttribute('id', 'comments');
    expect(comments).toHaveAttribute('name', 'comments');
    expect(comments).toHaveAttribute('rows', '4');
    expect(comments).toHaveAttribute('placeholder', 'Any special requests or dietary requirements?');
  });

  test('shows error messages on invalid submission', () => {
    render(
      <Form
        availableTimes={availableTimes}
        dispatch={dispatch}
        submitForm={submitForm}
        isSubmitting={false}
        submissionError=""
      />
    );

    // Attempt to submit without filling required fields
    const submitButton = screen.getByRole('button', { name: /Submit reservation request/i });
    fireEvent.click(submitButton);

    // Check that error messages are displayed for required fields
    expect(screen.getByText(/Please select a date\./i)).toBeInTheDocument();
    expect(screen.getByText(/First name must be at least 3 characters long/i)).toBeInTheDocument();
    expect(screen.getByText(/Last name must be at least 2 characters long/i)).toBeInTheDocument();
    expect(screen.getByText(/Invalid email address/i)).toBeInTheDocument();
    expect(screen.getByText(/Please select a time slot\./i)).toBeInTheDocument();
    expect(screen.getByText(/Please select number of guests\./i)).toBeInTheDocument();
    expect(screen.getByText(/Please select an occasion\./i)).toBeInTheDocument();

    // Verify that the form submission was not triggered
    expect(submitForm).not.toHaveBeenCalled();
  });

  test('submits form with valid data', async () => {
    render(
      <Form
        availableTimes={availableTimes}
        dispatch={dispatch}
        submitForm={submitForm}
        isSubmitting={false}
        submissionError=""
      />
    );

    // Select date
    const calendarButton = screen.getByLabelText(/Calendar for date selection/i);
    fireEvent.click(calendarButton);
    
    // Fill in all form fields
    const timeSelect = screen.getByLabelText(/Time Slot/i);
    await waitFor(() => expect(timeSelect).not.toBeDisabled());
    fireEvent.change(timeSelect, { target: { value: '17:00' } });

    const guestsSelect = screen.getByLabelText(/Number of Guests/i);
    fireEvent.change(guestsSelect, { target: { value: '4' } });

    const occasionSelect = screen.getByLabelText(/Occasion/i);
    fireEvent.change(occasionSelect, { target: { value: 'Birthday' } });

    fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'john.doe@example.com' } });

    // Submit form
    const submitButton = screen.getByRole('button', { name: /Submit reservation request/i });
    fireEvent.click(submitButton);

    // Only verify form submission data
    await waitFor(() => {
      expect(submitForm).toHaveBeenCalledWith(
        expect.objectContaining({
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          hour: '17:00',
          guests: '4',
          occasion: 'Birthday',
          date: '2025-04-01',
        })
      );
    });
  });
});