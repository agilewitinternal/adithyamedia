import React from "react";
import "./Navbar.css";
import { navbarItems } from "./SidebarData";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import logo from "../../images/logo3.png";

const Navbar = ({ toggle }) => {
  return (
    <nav>
      <Link to="/" className="link">
        <img src={logo} alt="logo" />
      </Link>
      <div className="menu-items">
        {navbarItems.map((item, index) => (
          <Link className="link" to={item.link} key={index}>
            {item.title}
          </Link>
        ))}
      </div>
      <div className="mobile-menu-icon">
        <FaBars onClick={toggle} />
      </div>
    </nav>
  );
};

export default Navbar;
