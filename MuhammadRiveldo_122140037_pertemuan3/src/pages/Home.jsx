import React, { useState } from 'react';
import BookForm from '../components/BookForm/BookForm';
import BookList from '../components/BookList/BookList';
import BookFilter from '../components/BookFilter/BookFilter';
import './Home.css';

function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [editTarget, setEditTarget] = useState(null);

  const clearEdit = () => setEditTarget(null);

  return (
    <div className="home">
      <div className="controls">
        <input
          type="text"
          placeholder="Cari buku..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <BookFilter filterStatus={filterStatus} setFilterStatus={setFilterStatus} />
      </div>
      <div className="content-grid">
        <BookForm editTarget={editTarget} clearEdit={clearEdit} />
        <BookList
          searchTerm={searchTerm}
          filterStatus={filterStatus}
          setEditTarget={setEditTarget}
        />
      </div>
    </div>
  );
}

export default Home;