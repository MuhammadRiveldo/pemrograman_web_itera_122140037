import React from 'react';
import useBookStats from '../hooks/useBookStats';
import './Stats.css';

function Stats() {
  const { total, owned, reading, wishlist } = useBookStats();

  return (
    <div className="stats-page">
      <h2>Statistik Buku</h2>
      <div className="stats-grid">
        <div className="stat-card owned">
          <h3>{owned}</h3>
          <p>Milik Saya</p>
        </div>
        <div className="stat-card reading">
          <h3>{reading}</h3>
          <p>Sedang Dibaca</p>
        </div>
        <div className="stat-card wishlist">
          <h3>{wishlist}</h3>
          <p>Ingin Membeli</p>
        </div>
        <div className="stat-card total">
          <h3>{total}</h3>
          <p>Total Buku</p>
        </div>
      </div>
    </div>
  );
}

export default Stats;
