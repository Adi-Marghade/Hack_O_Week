import React from 'react';
import { useBooks } from '../context/BookContext';
import { BookCard } from './BookCard';

export function BookList({ onSelectEditBook }) {
  const { books, deleteBook } = useBooks();

  if (books.length === 0) {
    return <p>No books available. Add one above!</p>;
  }

  return (
    <div>
      <h3>Your Uploaded Books</h3>
      {books.map((book) => (
        <BookCard key={book.id} book={book} onEdit={onSelectEditBook} onDelete={deleteBook} />
      ))}
    </div>
  );
}