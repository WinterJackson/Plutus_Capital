import React from "react";
import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <div>
      <nav className="navbar">
        <NavLink exact="true" to="/" className="nav-link" activeClassName="active">
          HOME
        </NavLink>
        <NavLink exact="true" to="/questions" className="nav-link" activeClassName="active">
          TAKE SURVEY
        </NavLink>
        <NavLink exact="true" to="/help" className="nav-link" activeClassName="active">
          HELP
        </NavLink>
      </nav>
    </div>
  );
}

export default NavBar;
