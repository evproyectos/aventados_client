import { useState, useEffect } from 'react';
import {
  fetchRides as fetchRidesApi,
  fetchRideById as fetchRideByIdApi,
  fetchRidesByDriver as fetchRidesByDriverApi,
  createRide as createRideApi,
  updateRide as updateRideApi,
  deleteRide as deleteRideApi,
  bookRide as bookRideApi,
} from '../services/rideService';

const useRides = () => {
  const [token, setToken] = useState(null); // State to hold the token
  const [rides, setRides] = useState([]);
  const [ride, setRide] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to fetch token from localStorage
  const getToken = () => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);
    return storedToken;
  };

  useEffect(() => {
    getToken(); // Fetch token when component mounts
  }, []);

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

  const fetchRideById = async (id) => {
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

  const bookRide = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const data = await bookRideApi(id, token);
      setRides((prevRides) =>
        prevRides.map((ride) => (ride._id === id ? data.ride : ride))
      );
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    rides,
    ride,
    loading,
    error,
    fetchRides,
    fetchRideById,
    fetchRidesByDriver,
    createRide,
    updateRide,
    deleteRide,
    bookRide,
    getToken
  };
};

export default useRides;
