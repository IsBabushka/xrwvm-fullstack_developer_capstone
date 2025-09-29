import React, { useState } from "react";
import "./Register.css";
import user_icon from "../assets/person.png"
import email_icon from "../assets/email.png"
import password_icon from "../assets/password.png"
import close_icon from "../assets/close.png"

const Register = () => {
// State variables for form inputs
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setlastName] = useState("");

// Redirect to home
  const gohome = ()=> {
    window.location.href = window.location.origin;
  }

// Handle form submission
  const register = async (e) => {
    e.preventDefault();

    let register_url = window.location.origin+"/djangoapp/register";

// Send POST request to register endpoint
    const res = await fetch(register_url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "userName": userName,
            "password": password,
            "firstName":firstName,
            "lastName":lastName,
            "email":email
        }),
    });

    const json = await res.json();
    if (json.status) {
    // Save username in session and reload home
        sessionStorage.setItem('username', json.userName);
        window.location.href = window.location.origin;
    }
    else if (json.error === "Already Registered") {
      alert("The user with same username is already registered");
      window.location.href = window.location.origin;
    }
};

  return(
    <div className="register_container">
      <div className="header">
          <span className="text">Sign Up</span>
          <button className="close-btn" onClick={gohome} aria-label="Close registration form">
            <img src={close_icon} alt="Close"/>
          </button>
        </div>

        <form onSubmit={register}>
        <div className="inputs">
          <div className="input">
            <img src={user_icon} className="img_icon" alt='Username'/>
            <input type="text"  name="username" placeholder="Username" className="register_input_field" onChange={(e) => setUserName(e.target.value)} required/>
          </div>
          <div className="input">
            <img src={user_icon} className="img_icon" alt='First Name'/>
            <input type="text"  name="first_name" placeholder="First Name" className="register_input_field" onChange={(e) => setFirstName(e.target.value)} required/>
          </div>

          <div className="input">
            <img src={user_icon} className="img_icon" alt='Last Name'/>
            <input type="text"  name="last_name" placeholder="Last Name" className="register_input_field" onChange={(e) => setlastName(e.target.value)} required/>
          </div>

          <div className="input">
            <img src={email_icon} className="img_icon" alt='Email'/>
            <input type="email"  name="email" placeholder="Email" className="register_input_field" onChange={(e) => setEmail(e.target.value)} required/>
          </div>

          <div className="input">
            <img src={password_icon} className="img_icon" alt='password'/>
            <input name="psw" type="password"  placeholder="Password" className="register_input_field" onChange={(e) => setPassword(e.target.value)} required/>
          </div>

        </div>
        <div className="register_submit_panel">
          <input className="register_submit" type="submit" value="Register"/>
        </div>
      </form>
      </div>
  )
}

export default Register;