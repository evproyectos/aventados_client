import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/home';
import Layout from './components/Layout/Layout';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Login from './pages/Login/login';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Registration from './pages/Register/register';

function App() {
  const [count, setCount] = useState(0);

  return (
      <Router>
        
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />

        <Route
          path="/*"
          element={
            <Layout>
              <ProtectedRoute element={<Home />} />
            </Layout>
          }
        />
      </Routes>
      </Router>
  );
}

export default App;
