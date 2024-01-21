import React from 'react';
import PropTypes from 'prop-types';

function CategoriesList({ categories, selectedCategory, selectCategory }) {
  return (
    <div>
      {
      categories.map((category) => {
        const isSelected = selectedCategory === category;
        return (
          <button
            key={category}
            type="button"
            onClick={() => selectCategory(category)}
            className={`
                px-2 py-1 mr-2 rounded-full border-2 text-xs font-medium
                ${isSelected
              ? 'border-blue-600 text-blue-600 bg-blue-100'
              : 'border-gray-400 text-gray-500 hover:bg-blue-100'
                }
            `}
          >
            {`#${category}`}
          </button>
        );
      })
    }
    </div>
  );
}

CategoriesList.propTypes = {
  selectedCategory: PropTypes.string.isRequired,
  categories: PropTypes.arrayOf(
    PropTypes.string.isRequired,
  ).isRequired,
  selectCategory: PropTypes.func.isRequired,
};

export default CategoriesList;
