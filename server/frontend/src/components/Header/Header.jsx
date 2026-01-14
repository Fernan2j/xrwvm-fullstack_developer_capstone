import React from "react";
import "../assets/style.css";
import "../assets/bootstrap.min.css";

const Header = () => {
  const logout = async (e) => {
    e.preventDefault();
    let logout_url = window.location.origin + "/djangoapp/logout";
    const res = await fetch(logout_url, {
      method: "GET",
    });

    const json = await res.json();
    if (json) {
      let username = sessionStorage.getItem("username");
      sessionStorage.removeItem("username");
      window.location.href = window.location.origin;
      window.location.reload();
      alert("Logging out " + username + "...");
    } else {
      alert("The user could not be logged out.");
    }
  };

  // Gets the username in the current session
  let curr_user = sessionStorage.getItem("username");

  // Default: Show Login/Register if no user is logged in
  let home_page_items = (
    <div className="navbar-nav ml-auto">
      <a className="nav-link" href="/login">
        Login
      </a>
      <a className="nav-link" href="/register">
        Register
      </a>
    </div>
  );

  // If the user is logged in, show the username and logout option
  if (curr_user !== null && curr_user !== "") {
    home_page_items = (
      <div className="navbar-nav ml-auto">
        <span className="nav-link text-white fw-bold">Hello, {curr_user}</span>
        <a className="nav-link" href="/djangoapp/logout" onClick={logout}>
          Logout
        </a>
      </div>
    );
  }

  return (
    <div>
      <nav
        className="navbar navbar-expand-lg navbar-dark"
        style={{ backgroundColor: "#003366" }}
      >
        <div className="container-fluid">
          {/* Brand Name Update */}
          <a className="navbar-brand" href="/">
            Best Cars Automotive
          </a>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/about">
                  About Us
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/contact">
                  Contact Us
                </a>
              </li>
            </ul>

            {/* Render the Login/Logout items */}
            <span className="navbar-text">{home_page_items}</span>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
