import React from 'react';

export function BookCard({ book, onEdit, onDelete }) {
  return (
    <div className="book-card">
      <div className="book-card-header">
        <h4 className="book-title">{book.title}</h4>
        <span className="badge">{book.category}</span>
      </div>
      <p className="book-meta">By <strong>{book.author}</strong></p>
      {book.fileData && (
        <div>
          <a
            href={book.fileData.content}
            download={book.fileData.name}
            className="download-link"
          >
            📎 Download {book.fileData.name} ({book.fileData.size})
          </a>
        </div>
      )}
      <div className="card-actions">
        <button onClick={() => onEdit(book)} className="btn btn-secondary">
          Edit
        </button>
        <button onClick={() => onDelete(book.id)} className="btn btn-danger">
          Delete
        </button>
      </div>
    </div>
  );
}