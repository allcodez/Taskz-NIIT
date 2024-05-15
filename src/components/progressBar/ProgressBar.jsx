// ProgressBar.jsx
import React from 'react';
import './progressBar.css';

export default function ProgressBar({ progress, className }) {
    return (
        <div className={`progress-bar-container ${className}`}>
            <div className="progress-bar" style={{ width: `${progress}%` }}></div>
        </div>
    );
}
