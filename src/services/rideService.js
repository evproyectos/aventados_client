const API_URL = 'http://localhost:3001/rides';
const API_URL_Bookings = 'http://localhost:3001';

/**
 * Generates headers for API requests including authorization token.
 * @param {string} token - The authorization token.
 * @returns {Object} The headers object for the request.
 */
const headers = (token) => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${token}`,
});

/**
 * Fetches all rides.
 * @param {string} token - The authorization token.
 * @returns {Promise<Object[]>} The list of rides.
 * @throws {Error} If the network response is not ok.
 */
const fetchRides = async (token) => {
  const response = await fetch(`${API_URL}`, {
    headers: headers(token),
  });
  if (!response.ok) throw new Error('Failed to fetch rides');
  return response.json();
};

/**
 * Fetches a specific ride by its ID.
 * @param {string} id - The ID of the ride.
 * @param {string} token - The authorization token.
 * @returns {Promise<Object>} The ride details.
 * @throws {Error} If the network response is not ok.
 */
const fetchRideById = async (id, token) => {
  const response = await fetch(`${API_URL}/${id}`, {
    headers: headers(token),
  });
  if (!response.ok) throw new Error('Failed to fetch ride');
  return response.json();
};

/**
 * Fetches all rides for a specific driver.
 * @param {string} driverId - The ID of the driver.
 * @param {string} token - The authorization token.
 * @returns {Promise<Object[]>} The list of rides for the driver.
 * @throws {Error} If the network response is not ok.
 */
const fetchRidesByDriver = async (driverId, token) => {
  const response = await fetch(`${API_URL}/driver/${driverId}`, {
    headers: headers(token),
  });
  if (!response.ok) throw new Error('Failed to fetch rides by driver');
  return response.json();
};

/**
 * Fetches all bookings for a specific driver.
 * @param {string} driverId - The ID of the driver.
 * @param {string} token - The authorization token.
 * @returns {Promise<Object[]>} The list of bookings for the driver.
 * @throws {Error} If the network response is not ok.
 */
const fetchBookings = async (driverId, token) => {
  const response = await fetch(`${API_URL_Bookings}/bookings/driver/${driverId}`, {
    headers: headers(token),
  });
  if (!response.ok) throw new Error('Failed to fetch bookings by driver');
  return response.json();
};

/**
 * Fetches all bookings for a specific passenger.
 * @param {string} passengerId - The ID of the passenger.
 * @param {string} token - The authorization token.
 * @returns {Promise<Object[]>} The list of bookings for the passenger.
 * @throws {Error} If the network response is not ok.
 */
const fetchBookingsByPassenger = async (passengerId, token) => {
  const response = await fetch(`${API_URL_Bookings}/bookings/passenger/${passengerId}`, {
    headers: headers(token),
  });
  if (!response.ok) throw new Error('Failed to fetch bookings by passenger');
  return response.json();
};

/**
 * Creates a new ride with the provided data.
 * @param {Object} rideData - The data for the new ride.
 * @param {string} token - The authorization token.
 * @returns {Promise<Object>} The created ride.
 * @throws {Error} If the network response is not ok.
 */
const createRide = async (rideData, token) => {
  try {
    const response = await fetch(`${API_URL}`, {
      method: 'POST',
      headers: headers(token),
      body: JSON.stringify(rideData),
    });

    if (!response.ok) {
      throw new Error('Failed to create ride');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating ride:', error.message);
    throw error;
  }
};

/**
 * Updates an existing ride by its ID with the provided data.
 * @param {string} id - The ID of the ride to update.
 * @param {Object} rideData - The updated ride data.
 * @param {string} token - The authorization token.
 * @returns {Promise<Object>} The updated ride.
 * @throws {Error} If the network response is not ok.
 */
const updateRide = async (id, rideData, token) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: headers(token),
      body: JSON.stringify(rideData),
    });

    if (!response.ok) {
      throw new Error('Failed to update ride');
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating ride:', error);
    throw error;
  }
};

/**
 * Deletes a ride by its ID.
 * @param {string} id - The ID of the ride to delete.
 * @param {string} token - The authorization token.
 * @returns {Promise<Object>} The response from the API.
 * @throws {Error} If the network response is not ok.
 */
const deleteRide = async (id, token) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    headers: headers(token),
  });
  if (!response.ok) throw new Error('Failed to delete ride');
  return response.json();
};

/**
 * Books a ride with the specified ID.
 * @param {string} id - The ID of the ride to book.
 * @param {string} token - The authorization token.
 * @returns {Promise<Object>} The response from the API.
 * @throws {Error} If the network response is not ok.
 */
const bookRide = async (id, token) => {
  const response = await fetch(`${API_URL_Bookings}/bookings/bookride`, {
    method: 'POST',
    headers: headers(token),
    body: JSON.stringify({ rideId: id }),
  });
  if (!response.ok) throw new Error('Failed to book ride');
  return response.json();
};

/**
 * Updates a booking with the specified ID and data.
 * @param {string} id - The ID of the booking to update.
 * @param {Object} bookingData - The updated booking data.
 * @param {string} token - The authorization token.
 * @returns {Promise<Object>} The updated booking.
 * @throws {Error} If the network response is not ok.
 */
const updateBooking = async (id, bookingData, token) => {
  try {
    const response = await fetch(`${API_URL_Bookings}/bookings/${id}/status`, {
      method: 'PUT',
      headers: headers(token),
      body: JSON.stringify(bookingData),
    });

    if (!response.ok) {
      throw new Error('Failed to update booking');
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating booking:', error);
    throw error;
  }
};

export {
  fetchRides,
  fetchRideById,
  fetchRidesByDriver,
  createRide,
  updateRide,
  deleteRide,
  bookRide,
  fetchBookings,
  updateBooking,
  fetchBookingsByPassenger,
};
