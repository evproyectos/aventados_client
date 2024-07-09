import { useState } from 'react';
import { login, register, getUserInfo, updateUser, deleteUser } from '../services/authService';

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      const data = await login(credentials);
      setUser(data.user);
      localStorage.setItem('token', data.token);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setUser(null);

    localStorage.removeItem('token');
  };

  const handleRegister = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const data = await register(userData);
      setUser(data.user);
      localStorage.setItem('token', data.token);
      console.log(data)
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

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

  return { user, loading, error, handleLogin, handleLogout, handleRegister, fetchUserInfo, handleUpdateUser, handleDeleteUser };
};

export default useAuth;
