import React from 'react';

export default function CategoryOption({ category, handleChange }) {

    const categoryOptions = [
        { name: 'Personal' },
        { name: 'Work' },
        { name: 'Study' },
        { name: 'Uncategorised' },
    ];

    // Define an object to map category names to icon classes
    const categoryIcons = {
        Personal: 'bx bx-user-circle', // Example icon class for Personal category
        Work: 'bx bx-briefcase', // Example icon class for Work category
        Study: 'bx bx-book', // Example icon class for Study category
        Uncategorised: 'bx bx-hash', // Example icon class for Uncategorised category
    };

    return (
        <div>
            {/* Map through categoryOptions array */}
            {categoryOptions.map((option, index) => (
                <div className='category-option-list' key={index} onClick={() => handleChange(option.name)} style={{ cursor: 'pointer' }}>
                    {/* Retrieve the icon class based on category name */}
                    <i className={categoryIcons[option.name]}></i>
                    {/* Display category name */}
                    <span>{option.name}</span>
                </div>
            ))}
        </div>
    );
};
