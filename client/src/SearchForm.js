import React, { useState, useEffect } from 'react';

function SearchForm({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Debounce function to delay the search
    const delayDebounceFn = setTimeout(() => {
      onSearch(searchTerm);
    }, 300); // 300ms delay

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, onSearch]);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="search-form">
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Search posts by title"
      />
      {searchTerm && (
        <button onClick={() => setSearchTerm('')}>Clear</button>
      )}
    </div>
  );
}

export default SearchForm;