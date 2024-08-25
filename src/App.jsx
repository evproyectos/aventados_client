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
import Verification from './pages/Verification/verification';
import VerifyPin from './pages/Login/Verify_Pin/verifyPin';
import Bookings from './pages/Bookings/bookings';
import RequestStatus from './pages/Status/request_status';


function App() {
  <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDDAML7UQ9iJXobcmpVPwSZdRYZei0BYZc&libraries=places"></script>


  return (
      <Router>
        
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/verify-pin" element={<VerifyPin />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/registerdriver" element={<RegistrationDriver />} />
        <Route path="/verify" element={<Verification />} />

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
          path="/status"
          element={
            <Layout>
              <ProtectedRoute element={<RequestStatus />} />
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
          path="/bookings"
          element={
            <Layout>
              <ProtectedRoute element={<Bookings />} />
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
