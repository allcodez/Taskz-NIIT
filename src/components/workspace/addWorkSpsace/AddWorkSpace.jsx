import React, { useState } from 'react';
import './addWorkSpace.css';

export default function AddWorkSpace({ onClose }) {
    const [workspaceName, setWorkspaceName] = useState('');
    const [allowedDomains, setAllowedDomains] = useState([]);
    const [saveAnalytics, setSaveAnalytics] = useState(true);

    const handleNameChange = (e) => setWorkspaceName(e.target.value);
    const handleDomainChange = (e) => {
        if (e.key === 'Enter' && e.target.value) {
            setAllowedDomains([...allowedDomains, e.target.value]);
            e.target.value = '';
        }
    };
    const handleAnalyticsToggle = () => setSaveAnalytics(!saveAnalytics);

    return (
        <div className="add-workspace-container">
            <div className="add-workspace-overlay" onClick={onClose}></div>
            <div className="add-workspace-dialog" role="dialog" tabIndex="0" aria-label="add-workspace & members">
                <div className="add-workspace-content">
                    <div className="add-workspace-section">
                        <h2>Create a workspace</h2>
                        <div className="setting-group">
                            <label htmlFor="workspace-name">Workspace Name</label>
                            <input
                                id="workspace-name"
                                type="text"
                                placeholder="Workspace Name"
                                value={workspaceName}
                                onChange={handleNameChange}
                            />
                            <p className="help-text">You can use your organization or company name. Keep it simple.</p>
                        </div>
                        <div className="setting-group">
                            <label>Icon</label>
                            <div className="workspace-icon">
                                <div className="icon-placeholder">a</div>
                            </div>
                            <p className="help-text">Upload a worspace image.</p>
                        </div>
                        <div className="setting-group">
                            <label htmlFor="workspace-name">Workspace Description</label>
                            <textarea
                                id="workspace-name"
                                type="text"
                                placeholder="Workspace Description"
                                value={workspaceName}
                                onChange={handleNameChange}
                            />
                            <p className="help-text">A simple description about your workspace.</p>
                        </div>
                        <div className="add-workspace-section">
                            <h2>Add Team Members</h2>
                            <div className="setting-group">
                                <label>Email address of registered users</label>
                                <div className="email-domains-input">
                                    <input
                                        type="text"
                                        placeholder="Enter email address..."
                                        onKeyPress={handleDomainChange}
                                    />
                                    <button className="add-worspace-user-button">
                                        <i className="bx bx-plus"></i>
                                    </button>
                                </div>
                                <p className="help-text">The user will automaically join the workspace if registered.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="add-workspace-footer">
                    <button className="update-button">Create</button>
                    <button className="cancel-button" onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};