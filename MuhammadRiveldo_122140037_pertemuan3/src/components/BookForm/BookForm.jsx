import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { BookContext } from '../../context/BookContext';
import './BookForm.css';
import { toast } from 'react-toastify';

function BookForm({ editTarget, clearEdit }) {
  const { addBook, updateBook } = useContext(BookContext);
  const [form, setForm] = useState({ title: '', author: '', status: 'milik' });

  useEffect(() => {
    if (editTarget) setForm(editTarget);
  }, [editTarget]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.title || !form.author) {
      toast.error('Judul dan penulis wajib diisi');
      return;
    }
    if (editTarget) {
      updateBook(form);
      toast.success('Buku diperbarui!');
      clearEdit();
    } else {
      addBook({ ...form, id: Date.now().toString() });
      toast.success('Buku baru ditambahkan!');
    }
    setForm({ title: '', author: '', status: 'milik' });
  };

  return (
    <form className="book-form" onSubmit={handleSubmit}>
      <input name="title" placeholder="Judul Buku" value={form.title} onChange={handleChange} />
      <input name="author" placeholder="Penulis" value={form.author} onChange={handleChange} />
      <select name="status" value={form.status} onChange={handleChange}>
        <option value="milik">Milik Saya</option>
        <option value="baca">Sedang Dibaca</option>
        <option value="beli">Ingin Membeli</option>
      </select>
      <button type="submit">{editTarget ? 'Update Buku' : 'Tambah Buku'}</button>
    </form>
  );
}

BookForm.propTypes = {
  editTarget: PropTypes.shape({ id: PropTypes.string, title: PropTypes.string, author: PropTypes.string, status: PropTypes.string }),
  clearEdit: PropTypes.func,
};

BookForm.defaultProps = { editTarget: null, clearEdit: () => {} };

export default BookForm;