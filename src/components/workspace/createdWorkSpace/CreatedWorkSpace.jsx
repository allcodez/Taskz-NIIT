import react from 'react'
import './createdWorkSpace.css'
import WorkspaceImg from '../../../asstes/images/pexels-vlada-karpovich-4050344.jpg'

export default function CreatedWorkSpace({onCreateWorkspace}) {
    return (
        <div className='created-workspace-container'>
            <div className='created-workspace-container-head'>
                <i class='bx bx-time'></i>
                <p>Created WorkSpace</p>
            </div>
            <div className="created-workspace-list">
                <div className='created-workspace-content'>
                    <div className='created-workspace-img'>
                        <img src={WorkspaceImg} alt="" />
                    </div>
                    <div className='created-workspace-details'>
                        <b>Taskz Niit</b>
                        <p>2 Member</p>
                    </div>
                </div>

                <div className='create-new-workspace-content' onClick={onCreateWorkspace}>
                    <div className='create-new-workspace-img'>
                    </div>
                    <button className='create-new-workspace-button'>
                        <i className='bx bx-plus'></i>
                    </button>
                    <div className='created-workspace-details'>
                        <b>New Workspace</b>
                        {/* <p>2 Member</p> */}
                    </div>
                </div>
            </div>
        </div>
    )
}