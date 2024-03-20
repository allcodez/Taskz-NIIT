import React from 'react'
import '../page/Form/form.css'

export default function Signup({handleSignUpClick}) {
    return(
        <form action="#" className="sign-up-form">
        <h2 className="title">Sign up</h2>
        <div className="input-field">
            <i className="fas fa-user"></i>
            <input type="text" placeholder="Username" />
        </div>
        <div className="input-field">
            <i className="fas fa-envelope"></i>
            <input type="email" placeholder="Email" />
        </div>
        <div className="input-field">
            <i className="fas fa-lock"></i>
            <input type="password" placeholder="Password" />
        </div>
        <button id="sign-up-btn" onClick={handleSignUpClick}>Sign Up</button>
        <p className="social-text">Or Sign up with social platforms</p>
        <div className="social-media">
            <a href="#" className="social-icon">
                <i className="fab fa-google"></i>
            </a>
        </div>
    </form>
    )
}