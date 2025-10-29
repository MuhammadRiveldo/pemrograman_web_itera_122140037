//import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Stats from './pages/Stats'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'

function App() {
  return (
    <Router>
      <header className="app-header">
        <h1 data-testid="web__title">📚 RivelReads Aplikasi Digital Pencatat Buku</h1>
        <nav>
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/stats" className="nav-link">Statistics</Link>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/stats" element={<Stats />} />
        </Routes>
      </main>
      <ToastContainer position="top-right" autoClose={3000} />
    </Router>
  );
}

export default App;