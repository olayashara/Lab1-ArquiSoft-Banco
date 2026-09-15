import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import CustomersList from './components/CustomersList';
import TransferMoney from './components/TransferMoney';
import TransactionHistory from './components/TransactionHistory';

function App() {
  return (
    <Router>
      <div className="app-container">
        <header className="navbar">
          <h1>🏦 Banca en Línea</h1>
          <nav className="nav-links">
            <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>Clientes</NavLink>
            <NavLink to="/transfer" className={({ isActive }) => isActive ? 'active' : ''}>Transferir</NavLink>
            <NavLink to="/history" className={({ isActive }) => isActive ? 'active' : ''}>Historial</NavLink>
          </nav>
        </header>

        <main className="card">
          <Routes>
            <Route path="/" element={<CustomersList />} />
            <Route path="/transfer" element={<TransferMoney />} />
            <Route path="/history" element={<TransactionHistory />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
