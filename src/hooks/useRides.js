import { useState, useEffect } from 'react';
import {
  fetchRides as fetchRidesApi,
  fetchRideById as fetchRideByIdApi,
  fetchRidesByDriver as fetchRidesByDriverApi,
  createRide as createRideApi,
  updateRide as updateRideApi,
  deleteRide as deleteRideApi,
  bookRide as bookRideApi,
  fetchBookings as fetchBookingsApi,
  updateBooking as updateBookingApi,
  fetchBookingsByPassenger as fetchBookingsByPassengerApi
} from '../services/rideService';

/**
 * Custom hook for managing ride and booking data.
 * Provides functions for fetching, creating, updating, and deleting rides and bookings.
 * Also manages loading and error states, and handles token management.
 * @returns {Object} The current state and functions for rides and bookings management.
 */
const useRides = () => {
  const [token, setToken] = useState(null); // State to hold the token
  const [rides, setRides] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [ride, setRide] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Retrieves token from local storage and updates state.
   * @returns {string|null} The token from local storage.
   */
  const getToken = () => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);
    return storedToken;
  };

  // Fetch token on component mount
  useEffect(() => {
    getToken();
  }, []);

  /**
   * Fetches all rides using the stored token.
   * Updates the state with the fetched rides.
   * @returns {Promise<void>}
   */
  const fetchRides = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchRidesApi(token);
      setRides(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Fetches a specific ride by its ID using the stored token.
   * Updates the state with the fetched ride.
   * @param {string} id - The ID of the ride to fetch.
   * @returns {Promise<void>}
   */
  const fetchRideById = async (id,token) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchRideByIdApi(id, token);
      setRide(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Fetches all rides associated with a specific driver using the stored token.
   * Updates the state with the fetched rides.
   * @param {string} driverId - The ID of the driver.
   * @returns {Promise<void>}
   */
  const fetchRidesByDriver = async (driverId) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchRidesByDriverApi(driverId, token);
      setRides(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Fetches all bookings made by a specific passenger using the stored token.
   * Updates the state with the fetched bookings.
   * @param {string} passengerId - The ID of the passenger.
   * @returns {Promise<void>}
   */
  const fetchRidesByPassenger = async (passengerId) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchBookingsByPassengerApi(passengerId, token);
      setBookings(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Creates a new ride with the provided data using the stored token.
   * Updates the state with the newly created ride.
   * @param {Object} rideData - The data for the new ride.
   * @returns {Promise<void>}
   */
  const createRide = async (rideData) => {
    setLoading(true);
    setError(null);
    try {
      const data = await createRideApi(rideData, token);
      setRides((prevRides) => [...prevRides, data.ride]);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Updates an existing ride with the provided data.
   * Updates the state with the modified ride.
   * @param {string} id - The ID of the ride to update.
   * @param {Object} rideData - The updated data for the ride.
   * @returns {Promise<void>}
   */
  const updateRide = async (id, rideData) => {

    setLoading(true);
    setError(null);
    try {
      const data = await updateRideApi(id, rideData, token);
      setRides((prevRides) =>
        prevRides.map((ride) => (ride._id === id ? data.ride : ride))
      );
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Deletes a ride by its ID using the stored token.
   * Updates the state by removing the deleted ride.
   * @param {string} id - The ID of the ride to delete.
   * @returns {Promise<void>}
   */
  const deleteRide = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await deleteRideApi(id, token);
      setRides((prevRides) => prevRides.filter((ride) => ride._id !== id));
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Books a ride by its ID using the stored token.
   * Updates the state with the booked ride.
   * @param {string} rideId - The ID of the ride to book.
   * @returns {Promise<void>}
   */
  const bookRide = async (rideId) => {
    setLoading(true);
    setError(null);
    try {
      const data = await bookRideApi(rideId, token);
      setRides((prevRides) =>
        prevRides.map((ride) => (ride._id === rideId ? data.ride : ride))
      );
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Fetches all bookings made by a specific driver using the stored token.
   * Updates the state with the fetched bookings.
   * @param {string} driverId - The ID of the driver.
   * @returns {Promise<void>}
   */
  const fetchBookingsByDriver = async (driverId) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchBookingsApi(driverId, token);
      setBookings(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Updates an existing booking with the provided data.
   * Updates the state with the modified booking.
   * @param {string} id - The ID of the booking to update.
   * @param {Object} bookingData - The updated data for the booking.
   * @returns {Promise<void>}
   */
  const updateBooking = async (id, bookingData) => {
    setLoading(true);
    setError(null);
    try {
      const data = await updateBookingApi(id, bookingData, token);
      setBookings((prevBookings) =>
        prevBookings.map((booking) => (booking._id === id ? data.booking : booking))
      );
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    rides,
    bookings,
    ride,
    loading,
    error,
    fetchRides,
    fetchRideById,
    fetchRidesByDriver,
    fetchRidesByPassenger,
    createRide,
    updateRide,
    deleteRide,
    bookRide,
    fetchBookingsByDriver,
    updateBooking,
    getToken
  };
};

export default useRides;
