import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/home';
import Layout from './components/Layout/Layout';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Login from './pages/Login/login';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Registration from './pages/Register/register';
import RegistrationDriver from './pages/Register/register_driver';
import Profile from './pages/Profile/profile';
import Rides from './pages/Rides/rides';
import NewRide from './pages/Rides/newRides';
import EditRide from './pages/Rides/editRides';


function App() {

  return (
      <Router>
        
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/registerdriver" element={<RegistrationDriver />} />

        <Route
          path="/"
          element={
            <Layout>
              <ProtectedRoute element={<Home />} />
            </Layout>
          }
        />

        <Route
          path="/profile"
          element={
            <Layout>
              <ProtectedRoute element={<Profile />} />
            </Layout>
          }
        />

        <Route
          path="/rides"
          element={
            <Layout>
              <ProtectedRoute element={<Rides />} />
            </Layout>
          }
        />

        <Route
          path="/new-ride"
          element={
            <Layout>
              <ProtectedRoute element={<NewRide />} />
            </Layout>
          }
        />

        <Route
          path="/edit-ride/:id"
          element={
            <Layout>
              <ProtectedRoute element={<EditRide />} />
            </Layout>
          }
        />


      </Routes>
      </Router>
  );
}

export default App;
