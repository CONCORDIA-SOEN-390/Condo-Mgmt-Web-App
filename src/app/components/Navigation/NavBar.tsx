import Link from "next/link";
import React, { useState } from "react";
import "./NavBar.css";

const Navbar = () => {

  return (
    <div className="Navbar">
      <div className="navbar-logo">
          <a href="/">Condo360</a>
      </div>

      <div className="navbar-content">
        <ul>
            <li><a href="/">Home</a></li>
            <li><a href="#">Properties</a></li>
            <li><a href="#">Contact</a></li>
            <li><a href="/login">Sign In</a></li>
        </ul>
      </div>

      
    </div>
  );
};

export default Navbar;