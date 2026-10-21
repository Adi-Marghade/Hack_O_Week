import React, { useMemo } from 'react';
import { useBooks } from '../context/BookContext';

export function LibraryStats() {
  const { books } = useBooks();

  // Optimized derived state calculation
  const stats = useMemo(() => {
    console.log('Calculating library metrics...');
    const totalBooks = books.length;
    const categoryCounts = books.reduce((acc, book) => {
      acc[book.category] = (acc[book.category] || 0) + 1;
      return acc;
    }, {});

    return { totalBooks, categoryCounts };
  }, [books]);

  return (
    <div className="stats-card">
      <h4>Library Overview</h4>
      <p>Total Books: <strong>{stats.totalBooks}</strong></p>
      <p style={{ marginTop: '8px', fontWeight: 600 }}>Categories Breakup:</p>
      <ul className="stats-badges">
        {Object.entries(stats.categoryCounts).map(([cat, count]) => (
          <li key={cat} className="badge">
            {cat}: {count}
          </li>
        ))}
      </ul>
    </div>
  );
}