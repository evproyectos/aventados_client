import { useState } from 'react';
import { login, register, getUserInfo, updateUser, deleteUser, verifyPin } from '../services/authService';

/**
 * Custom hook for managing authentication state and actions.
 * Provides functions for login, registration, user info retrieval, updating user info, deleting a user, and handling PIN verification.
 * Also manages loading and error states.
 * @returns {Object} The current user, loading state, error state, and authentication functions.
 */
const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Handles user login with provided credentials.
   * @param {Object} credentials - The login credentials.
   * @returns {Promise<void>}
   */
  const handleLogin = async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      const data = await login(credentials);
      localStorage.setItem('userId', data.userId);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handles PIN verification and updates user state and local storage.
   * @param {Object} credentials - The PIN verification credentials.
   * @returns {Promise<void>}
   */
  const handleVerificationPin = async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      const data = await verifyPin(credentials);
      setUser(data.user);
      localStorage.setItem('token', data.token);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Logs out the user by clearing the user state and removing the token from local storage.
   */
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  /**
   * Registers a new user with the provided data.
   * @param {Object} userData - The user registration data.
   * @returns {Promise<void>}
   */
  const handleRegister = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const data = await register(userData);
      setUser(data.user);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Fetches user information using the token stored in local storage.
   * @returns {Promise<void>}
   */
  const fetchUserInfo = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('No token found');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const data = await getUserInfo(token);
      setUser(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Updates user information with the provided data.
   * @param {Object} userData - The updated user data.
   * @returns {Promise<void>}
   */
  const handleUpdateUser = async (userData) => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('No token found');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const data = await updateUser(userData, token);
      setUser(data.user);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Deletes the user account using the token stored in local storage.
   * Clears the user state and removes the token from local storage.
   * @returns {Promise<void>}
   */
  const handleDeleteUser = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('No token found');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      await deleteUser(token);
      setUser(null);
      localStorage.removeItem('token');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { user, loading, error, handleLogin, handleLogout, handleRegister, fetchUserInfo, handleUpdateUser, handleDeleteUser, handleVerificationPin };
};

export default useAuth;
