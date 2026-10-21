import React, { useState } from 'react';
import { BookProvider, useBooks } from './context/BookContext';
import { BookForm } from './components/BookForm';
import { BookList } from './components/BookList';
import { LibraryStats } from './components/LibraryStats';

function LibraryApp() {
  const [editingBook, setEditingBook] = useState(null);
  const { addBook, updateBook } = useBooks();

  // Lifting state handle: processing form submit centrally
  const handleFormSubmit = (bookData) => {
    if (editingBook) {
      updateBook(bookData);
      setEditingBook(null);
    } else {
      addBook(bookData);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', fontFamily: 'Arial' }}>
      <h2>Personal Digital Library</h2>
      <LibraryStats />
      <BookForm
        editingBook={editingBook}
        onCancelEdit={() => setEditingBook(null)}
        onSubmitSuccess={handleFormSubmit}
      />
      <hr style={{ margin: '20px 0' }} />
      {/* State lifted up: Passing edit handler down to list item */}
      <BookList onSelectEditBook={(book) => setEditingBook(book)} />
    </div>
  );
}

export default function App() {
  return (
    <BookProvider>
      <LibraryApp />
    </BookProvider>
  );
}