import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BookForm from './BookForm';
import { BookContext } from '../../context/BookContext';
import { toast } from 'react-toastify';

// Mock toast functions
jest.mock('react-toastify', () => ({
  toast: {
    error: jest.fn(),
    success: jest.fn(),
  },
}));

describe('BookForm Component', () => {
  const addBook = jest.fn();
  const updateBook = jest.fn();
  const clearEdit = jest.fn();

  const renderWithContext = (editTarget = null) => {
    render(
      <BookContext.Provider value={{ addBook, updateBook }}>
        <BookForm editTarget={editTarget} clearEdit={clearEdit} />
      </BookContext.Provider>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders form fields with default values', () => {
    renderWithContext();
    // Inputs
    expect(screen.getByPlaceholderText(/judul buku/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/penulis/i)).toBeInTheDocument();
    // Select default
    const select = screen.getByRole('combobox');
    expect(select).toHaveValue('milik');
    // Submit button
    expect(screen.getByRole('button', { name: /tambah buku/i })).toBeInTheDocument();
  });

  test('shows error toast when submitting empty form', () => {
    renderWithContext();
    fireEvent.click(screen.getByRole('button', { name: /tambah buku/i }));
    expect(toast.error).toHaveBeenCalledWith('Judul dan penulis wajib diisi');
    expect(addBook).not.toHaveBeenCalled();
    expect(updateBook).not.toHaveBeenCalled();
  });

  test('calls addBook and resets form on successful add', () => {
    renderWithContext();
    // Fill form
    fireEvent.change(screen.getByPlaceholderText(/judul buku/i), { target: { value: 'My Title' } });
    fireEvent.change(screen.getByPlaceholderText(/penulis/i), { target: { value: 'Author Name' } });
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'baca' } });
    // Submit
    fireEvent.click(screen.getByRole('button', { name: /tambah buku/i }));

    expect(addBook).toHaveBeenCalledWith(expect.objectContaining({
      title: 'My Title',
      author: 'Author Name',
      status: 'baca',
      id: expect.any(String),
    }));
    expect(toast.success).toHaveBeenCalledWith('Buku baru ditambahkan!');

    // Form reset
    expect(screen.getByPlaceholderText(/judul buku/i)).toHaveValue('');
    expect(screen.getByPlaceholderText(/penulis/i)).toHaveValue('');
    expect(screen.getByRole('combobox')).toHaveValue('milik');
  });

  test('prefills form and calls updateBook on edit', () => {
    const editTarget = { id: '123', title: 'Old Title', author: 'Old Author', status: 'beli' };
    renderWithContext(editTarget);
    // Prefilled values
    expect(screen.getByPlaceholderText(/judul buku/i)).toHaveValue('Old Title');
    expect(screen.getByPlaceholderText(/penulis/i)).toHaveValue('Old Author');
    expect(screen.getByRole('combobox')).toHaveValue('beli');
    // Change title and submit
    fireEvent.change(screen.getByPlaceholderText(/judul buku/i), { target: { value: 'New Title' } });
    fireEvent.click(screen.getByRole('button', { name: /update buku/i }));

    expect(updateBook).toHaveBeenCalledWith({
      id: '123',
      title: 'New Title',
      author: 'Old Author',
      status: 'beli',
    });
    expect(clearEdit).toHaveBeenCalled();
    expect(toast.success).toHaveBeenCalledWith('Buku diperbarui!');
  });
});
