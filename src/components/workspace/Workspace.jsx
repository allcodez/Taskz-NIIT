import React, { useState, useEffect } from 'react';
import './workspace.css';
import Placeholder from '../../asstes/icons/Shared workspace-bro.svg'
// import CreateWorkspacePopup from './CreateWorkspacePopup';
import AddWorkSpace from './addWorkSpsace/AddWorkSpace';
import CreatedWorkSpace from './createdWorkSpace/CreatedWorkSpace';
import InvitedWorkSpace from './invitedWorkSpace/InvitedWorkSpace';

export default function Workspace({ workspaces, onCreateWorkspace }) {

    return (
        <div className="workspace-container">
            <h2>Welcome to Your Workspace</h2>

            {/* <>
                <CreatedWorkSpace onCreateWorkspace={onCreateWorkspace}/>
                <InvitedWorkSpace />
            </> */}
            <div className="workspace-header">
                <button onClick={onCreateWorkspace}>
                    <i className='bx bx-plus'></i>
                    <p>Create Workspace</p>
                </button>
            </div>

            {workspaces.length === 0 ? (
                <div className="workspace-content">
                    <img src={Placeholder} alt="" />
                    <p>No workspace created</p>
                </div>
            ) : (
                <div className="workspace-list">
                    {workspaces.map(workspace => (
                        <div key={workspace.id} className="workspace-item">
                            {workspace.name}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};