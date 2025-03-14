/* global fetchAPI, submitAPI */

/**
 * Initializes available times for the current date
 * @returns {Array} Array of available time slots
 */
export const initializeTimes = () => {
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
  export const updateTimes = (state, action) => {
    if (action.type === "UPDATE_TIMES") {
      try {
        const selectedDate = new Date(action.payload);
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