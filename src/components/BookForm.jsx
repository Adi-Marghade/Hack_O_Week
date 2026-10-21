import React, { useState, useEffect, useRef } from 'react';

export function BookForm({ editingBook, onCancelEdit, onSubmitSuccess }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('Technology');
  const [fileData, setFileData] = useState(null);

  // useRef to focus the title input on render or reset file input DOM state
  const titleInputRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (editingBook) {
      setTitle(editingBook.title);
      setAuthor(editingBook.author);
      setCategory(editingBook.category);
      setFileData(editingBook.fileData || null);
    } else {
      resetForm();
    }
    titleInputRef.current?.focus();
  }, [editingBook]);

  const resetForm = () => {
    setTitle('');
    setAuthor('');
    setCategory('Technology');
    setFileData(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFileData({
          name: file.name,
          size: (file.size / 1024).toFixed(1) + ' KB',
          type: file.type,
          content: reader.result // Base64 data URL
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !author.trim()) return;

    onSubmitSuccess({
      id: editingBook?.id,
      title,
      author,
      category,
      fileData
    });

    resetForm();
  };

  return (
    <form onSubmit={handleSubmit} className="book-form">
      <h3>{editingBook ? '✏️ Edit Book Record' : '📤 Upload New Book'}</h3>

      <div className="form-group">
        <label>Title</label>
        <input
          ref={titleInputRef}
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label>Author</label>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label>Category</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="Technology">Technology</option>
          <option value="Science">Science</option>
          <option value="Fiction">Fiction</option>
          <option value="Non-Fiction">Non-Fiction</option>
        </select>
      </div>

      <div className="form-group file-input-wrapper">
        <label>File Upload</label>
        <input ref={fileInputRef} type="file" onChange={handleFileChange} />
        {fileData && (
          <p className="file-info">Selected: {fileData.name} ({fileData.size})</p>
        )}
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          {editingBook ? 'Save Changes' : 'Add to Library'}
        </button>
        {editingBook && (
          <button type="button" onClick={onCancelEdit} className="btn btn-secondary">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}