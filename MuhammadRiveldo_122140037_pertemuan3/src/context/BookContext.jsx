import React, { createContext } from 'react';
import PropTypes from 'prop-types';
import useLocalStorage from '../hooks/useLocalStorage';

export const BookContext = createContext();

export function BookProvider({ children }) {
  // Sinkronisasi state dengan localStorage
  const [books, setBooks] = useLocalStorage('books', []);

  // CRUD
  const addBook = book => setBooks([...books, book]);
  const updateBook = updated => {
    setBooks(books.map(b => (b.id === updated.id ? updated : b)));
  };
  const deleteBook = id => setBooks(books.filter(b => b.id !== id));

  return (
    <BookContext.Provider value={{ books, addBook, updateBook, deleteBook }}>
      {children}
    </BookContext.Provider>
  );
}

BookProvider.propTypes = {
  children: PropTypes.node.isRequired,
};