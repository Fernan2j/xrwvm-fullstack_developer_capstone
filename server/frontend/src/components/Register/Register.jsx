import React, { useState } from "react";
import "./Register.css";
import Header from "../Header/Header";
import close_icon from "../assets/close.png";

const Register = () => {
  // State variables for form inputs
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setlastName] = useState("");

  // Redirect to home
  const gohome = () => {
    window.location.href = window.location.origin;
  };

  // Handle form submission
  const register = async (e) => {
    e.preventDefault();

    let register_url = window.location.origin + "/djangoapp/register";

    // Send POST request to register endpoint
    const res = await fetch(register_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: userName,
        password: password,
        firstName: firstName,
        lastName: lastName,
        email: email,
      }),
    });

    const json = await res.json();
    if (json.status) {
      // Save username in session and reload home
      sessionStorage.setItem("username", json.userName);
      window.location.href = window.location.origin;
    } else if (json.error === "Already Registered") {
      alert("The user with same username is already registered");
      window.location.href = window.location.origin;
    }
  };

  return (
    <div>
      <Header />

      <div className="container mt-5" style={{ maxWidth: "600px" }}>
        <div className="card shadow border-0">
          {/* Header Section */}
          <div className="card-header bg-white border-0 d-flex justify-content-between align-items-center pt-4 px-4">
            <h2 style={{ color: "#003366", fontWeight: "bold" }}>Sign Up</h2>
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                gohome();
              }}
              style={{ cursor: "pointer" }}
            >
              {/* Preserving your close icon, or you could use a bootstrap close button type="button" class="btn-close" */}
              <img style={{ width: "24px" }} src={close_icon} alt="Close" />
            </a>
          </div>
          <div className="card-body px-4 pb-4">
            <hr />
            <form onSubmit={register}>
              {/* Username */}
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  className="form-control"
                  placeholder="Choose a username"
                  onChange={(e) => setUserName(e.target.value)}
                  required
                />
              </div>
              {/* First Name */}
              <div className="mb-3">
                <label htmlFor="firstName" className="form-label">
                  First Name
                </label>
                <input
                  type="text"
                  name="first_name"
                  className="form-control"
                  placeholder="First Name"
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              {/* Last Name */}
              <div className="mb-3">
                <label htmlFor="lastName" className="form-label">
                  Last Name
                </label>
                <input
                  type="text"
                  name="last_name"
                  className="form-control"
                  placeholder="Last Name"
                  onChange={(e) => setlastName(e.target.value)}
                  required
                />
              </div>
              {/* Email */}
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Enter your email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              {/* Password */}
              <div className="mb-4">
                <label htmlFor="psw" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  name="psw"
                  className="form-control"
                  placeholder="Create a password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {/* Submit Button */}
              <div className="d-grid gap-2">
                <button
                  type="submit"
                  className="btn text-white"
                  style={{ backgroundColor: "#003366" }}
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
