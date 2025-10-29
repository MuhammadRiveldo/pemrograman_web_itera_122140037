import React from 'react';
import PropTypes from 'prop-types';
import './BookFilter.css';

function BookFilter({ filterStatus, setFilterStatus }) {
  return (
    <select
      className="book-filter"
      value={filterStatus}
      onChange={e => setFilterStatus(e.target.value)}
    >
      <option value="all">Semua Status</option>
      <option value="milik">Milik Saya</option>
      <option value="baca">Sedang Dibaca</option>
      <option value="beli">Ingin Membeli</option>
    </select>
  );
}

BookFilter.propTypes = {
  filterStatus: PropTypes.string.isRequired,
  setFilterStatus: PropTypes.func.isRequired,
};

export default BookFilter;