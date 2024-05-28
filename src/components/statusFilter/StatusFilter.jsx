// Suggested code may be subject to a license. Learn more: ~LicenseLog:2195564445.
import React, { useState } from 'react';
import './statusFilter.css'
// import { Button, Select, MenuItem } from '@mui/material';

const StatusFilter = ({ filterStatus, setFilterStatus }) => {
    const handleFilterChange = (status) => {
        setFilterStatus(status);
    };

    return (
        <div className="status-filter-container">
            <div
                className={filterStatus === 'All' ? 'active' : ''}
                onClick={() => handleFilterChange('All')}
            >
                All
            </div>
            <div
                className={filterStatus === 'Completed' ? 'active' : ''}
                onClick={() => handleFilterChange('Completed')}
            >
                Completed
            </div>
            <div
                className={filterStatus === 'Pending' ? 'active' : ''}
                onClick={() => handleFilterChange('Pending')}
            >
                Pending
            </div>
        </div>
    );
};

export default StatusFilter;
