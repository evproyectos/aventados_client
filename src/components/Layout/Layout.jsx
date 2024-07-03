// src/components/Layout.js
import React from 'react';
import './layout.css'; 
import Home from '../../pages/Home/home';
import NavB from '../Navbar/navbar';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <header className="layout-header">
        <NavB></NavB>
      </header>
      <main className="layout-content">
        {children}
      </main>
      <footer className="layout-footer">
        <p>&copy; 2024 Aventados. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default Layout;
