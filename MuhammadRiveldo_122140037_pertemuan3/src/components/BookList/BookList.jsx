import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { BookContext } from '../../context/BookContext';
import './BookList.css';
import { toast } from 'react-toastify';

function BookList({ searchTerm, filterStatus, setEditTarget }) {
  const { books, deleteBook } = useContext(BookContext);
  const filtered = books.filter(
    book =>
      (book.title && book.title.toLowerCase().includes(searchTerm?.toLowerCase())) &&
    (filterStatus === 'all' || book.status === filterStatus)

      /*book.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterStatus === 'all' || book.status === filterStatus) */
  );

  if (filtered.length === 0) return <p className="no-books">Buku tidak ditemukan</p>;

  return (
    <table className="book-table">
      <thead>
        <tr><th>Judul</th><th>Penulis</th><th>Status</th><th>Aksi</th></tr>
      </thead>
      <tbody>
        {filtered.map(book => (
          <tr key={book.id}>
            <td>{book.title}</td>
            <td>{book.author}</td>
            <td>
              <span className={`status status-${book.status}`}>
                {book.status === 'milik'
                  ? 'Milik Saya'
                  : book.status === 'baca'
                  ? 'Sedang Dibaca'
                  : 'Ingin Membeli'}
              </span>
            </td>
            <td>
              <button onClick={() => setEditTarget(book)}>Edit</button>
              <button
                onClick={() => {
                  deleteBook(book.id);
                  toast.info('Buku dihapus');
                }}>
                Hapus
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

BookList.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  filterStatus: PropTypes.string.isRequired,
  setEditTarget: PropTypes.func.isRequired,
};

export default BookList;