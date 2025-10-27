

import React from 'react';

const SearchFilter = ({ searchTerm, setSearchTerm, categories, selectedCategory, setSelectedCategory }) => {
    return (
        <div className="search-bar-container">
            <input
                type="text"
                placeholder="Search by product title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
            />
            <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="category-select"
            >
                <option value="">All Categories</option>
                {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                ))}
            </select>
        </div>
    );
};

export default SearchFilter;