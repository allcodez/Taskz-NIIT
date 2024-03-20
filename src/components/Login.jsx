import React from 'react'
import '../page/Form/form.css'


export default function Login({handleSignInClick}) {
    return(
        <form action="#" className="sign-in-form">
            <h2 className="title">Sign in</h2>
            <div className="input-field">
                <i className="fas fa-user"></i>
                <input type="text" placeholder="Username" />
            </div>
            <div className="input-field">
                <i className="fas fa-lock"></i>
                <input type="password" placeholder="Password" />
            </div>
            <button id="sign-in-btn" onClick={handleSignInClick}>Sign In</button>
            <p className="social-text">Or Sign in with social platforms</p>
            <div className="social-media">
                <a href="#" className="social-icon">
                    <i className="fab fa-google"></i>
                </a>
            </div>
        </form>
    )

}