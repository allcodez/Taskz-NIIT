import React, { useState } from 'react';
import './Dropdown.css';


export default function Dropdown() {
    const [showDropdown, setShowDropdown] = useState(false)
    const toggleShowDropdown=()=>{
        setShowDropdown(!showDropdown)
    }

    const dropDown_icons = [
        {}
    ]
return(
    <div className='Dropdown'>
        <h3 className='dropdown_name' onClick={toggleShowDropdown}>Star Taskz</h3>
       {
        showDropdown &&
        <div className='dropdown_content' style={{overflowY: "scroll"}}>
           <span className='Workspace'>
           <h5 className='dropdown_header'> Workspace <span className='line'></span></h5>
            <ul>
                <li>Settings</li>
                <li>Integrations</li>
                <li>Analytics</li>
                <li>Free Trial</li>
            </ul>
           </span>
           <span className='Workspace'>
           <h5 className='dropdown_header'> Workspace <span className='line'></span></h5>
            <ul>
                <li>Settings</li>
                <li>Integrations</li>
                <li>Analytics</li>
                <li>Free Trial</li>
            </ul>
           </span> 
           <span className='Workspace'>
           <h5 className='dropdown_header'> Workspace <span className='line'></span></h5>
            <ul>
                <li>Settings</li>
                <li>Integrations</li>
                <li>Analytics</li>
                <li>Free Trial</li>
            </ul>
           </span>
           <span className='Workspace'>
           <h5 className='dropdown_header'> Workspace <span className='line'></span></h5>
            <ul>
                <li>Settings</li>
                <li>Integrations</li>
                <li>Analytics</li>
                <li>Free Trial</li>
            </ul>
           </span> 
       </div>
       }
    </div>
)


}
