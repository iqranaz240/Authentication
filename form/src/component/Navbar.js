import React from "react";
import { Link } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function Navbar() {
  return (
    <div className="bg-primary">
      <nav class="navbar navbar-expand-lg navbar-light bg-primary">
        <div class="container-fluid">
          <Link className="navbar-brand text-light" to={"/"}>
            Navbar
          </Link>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse flex-grow-0" id="navbarText">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
              <li className="nav-item">
                <Link className="nav-link text-light" to={"/home"}>
                  Home
                </Link>
              </li>
              <Link className="nav-link text-light" to={"/about"}>
                About
              </Link>
              <li className="nav-item">
                <Link className="nav-link text-light" to={"/contact"}>
                  Contact
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-light pe-4" to={"/Signup"}>
                  <AccountCircleIcon sx={{ fontSize: 30 }} />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
