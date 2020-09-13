import React, { Component } from 'react';
import appLogo from  './appLogo.png'
import './Login.css'

let email, password, redirect;
// record email submitted by the user
const emailHandleChange = (event) => {
  email = event.target.value;
};
// record password submitted by the user
const passwordHandleChange = (event) => {
  password = event.target.value;
};

function LoginForm(props){
  // send login information to backend for authentication
  const handleSubmit = (event) => {
    event.preventDefault();
    const url = 'http://localhost:9000/authenticate/?email=' + email + '&password=' + password;
    fetch(url)
      .then(res => res.text())
      .then(res => {
        if (res === 'authenticated') {
          console.log('got correct from backend!');
          props.action();
        } else {
          alert('incorrect pair of email and password');
        }
      })
      .catch(err => err);
  };
  // login form
  return(
    <header id='login'>

    <div className='container'>
    <div className='blur'>
    <div className='welcome'>
    <h1 id='welcome'>Welcome To Mobility</h1>
    <h3 id='please'>Please Sign In</h3>
    </div>
    </div>
      <div className='form'>
      <form id='login' className='loginForm' onSubmit={handleSubmit}>
      <div class="logocontainer">
      <img src={appLogo} alt="Logo" class="avatar"></img>
      </div>
      <div class ='container'>
        <label for="email"><b>Email</b></label>
        <input type='text' id='inputEmail' name='email' className='usernameI' onChange={emailHandleChange}/><br/>

        <label for="loginEmail"><b>Password</b></label>
        <input type='password' id='inputPassword' name='password' className='passwordI' onChange={passwordHandleChange}/><br/>

        <button  type='submit'>Login</button>
      </div>
      </form>
      </div>
    </div>
    <div id='signupOpt'>Don't have an account?</div>
    <a id="signup-opt" href="/SignUp"> Sign Up </a>
    </header>
  );
}
export default LoginForm;