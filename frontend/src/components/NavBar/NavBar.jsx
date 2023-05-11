import React from "react";
import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import "./NavBar.css";

const Navbar = () => {
  const { logoutUser, user } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div className="navBar">
      <ul>
        <li className="brand">
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            <b>Task Manager</b>
          </Link>
        </li>
        <li className="space">
          {user ? (
            <button onClick={logoutUser}>Logout</button>
          ) : (
            <button onClick={() => navigate("/login")}>Login</button>
          )}
            <button onClick={() => navigate("/addtask")}>Add Task</button>
            <button onClick={() => navigate("/viewtask")}>View Tasks</button>
            <button onClick={() => navigate("/calendar")}>View Calendar</button>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
