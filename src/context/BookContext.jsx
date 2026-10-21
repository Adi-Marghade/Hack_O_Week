import React, { createContext, useContext, useCallback } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const BookContext = createContext();

export const BookProvider = ({ children }) => {
  const [books, setBooks] = useLocalStorage('digital_library_books', []);

  // Adding a book
  const addBook = useCallback((newBook) => {
    setBooks((prevBooks) => [
      ...prevBooks,
      { ...newBook, id: Date.now().toString(), createdAt: new Date().toLocaleDateString() }
    ]);
  }, [setBooks]);

  // Updating an existing book
  const updateBook = useCallback((updatedBook) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) => (book.id === updatedBook.id ? updatedBook : book))
    );
  }, [setBooks]);

  // Deleting a book
  const deleteBook = useCallback((id) => {
    setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
  }, [setBooks]);

  return (
    <BookContext.Provider value={{ books, addBook, updateBook, deleteBook }}>
      {children}
    </BookContext.Provider>
  );
};

export const useBooks = () => {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error('useBooks must be used within a BookProvider');
  }
  return context;
};      