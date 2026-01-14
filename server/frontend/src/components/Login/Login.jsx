import React, { useState } from "react";
import "./Login.css";
import Header from "../Header/Header";

const Login = ({ onClose }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(true);

  let login_url = window.location.origin + "/djangoapp/login";

  const login = async (e) => {
    e.preventDefault();

    const res = await fetch(login_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: userName,
        password: password,
      }),
    });

    const json = await res.json();
    if (json.status != null && json.status === "Authenticated") {
      sessionStorage.setItem("username", json.userName);
      setOpen(false);
    } else {
      alert("The user could not be authenticated.");
    }
  };

  if (!open) {
    window.location.href = "/";
  }

  return (
    <div>
      <Header />

      <div className="container mt-5" style={{ maxWidth: "450px" }}>
        {/* Click-outside listener */}
        <div onClick={onClose}>
          {/* Card Component:
             - 'card shadow border-0': Gives it depth and removes the default gray border.
             - 'stopPropagation': Prevents closing when clicking inside the box.
          */}
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="card shadow border-0"
          >
            {/* Header Section */}
            <div className="card-header bg-white border-0 pt-4 px-4">
              <h2 style={{ color: "#003366", fontWeight: "bold" }}>Login</h2>
              <hr />
            </div>

            <div className="card-body px-4 pb-4">
              <form onSubmit={login}>
                {/* Username Input */}
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    className="form-control"
                    placeholder="Enter Username"
                    onChange={(e) => setUserName(e.target.value)}
                    required
                  />
                </div>

                {/* Password Input */}
                <div className="mb-4">
                  <label htmlFor="psw" className="form-label">
                    Password
                  </label>
                  <input
                    name="psw"
                    type="password"
                    className="form-control"
                    placeholder="Enter Password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                {/* Buttons: Login & Cancel */}
                <div className="d-grid gap-2 mb-3">
                  <input
                    className="btn text-white"
                    type="submit"
                    value="Login"
                    style={{ backgroundColor: "#003366" }}
                  />

                  <input
                    className="btn btn-outline-secondary"
                    type="button"
                    value="Cancel"
                    onClick={() => setOpen(false)}
                  />
                </div>

                {/* Register Link */}
                <div className="text-center mt-3">
                  <span className="text-muted">Don't have an account? </span>
                  <a
                    className="text-decoration-none fw-bold"
                    href="/register"
                    style={{ color: "#003366" }}
                  >
                    Register Now
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
