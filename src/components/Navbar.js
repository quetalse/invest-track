// import { Fragment } from 'react';
import { NavLink } from "react-router-dom";

export const Navbar = ({handleLogout}) => (
    <nav className="navbar navbar-dark navbar-expand-md bg-primary">
        <div className="navbar-brand">
            Invest track
        </div>
        <ul className="navbar-nav">
            <li className="nav-item">
                <NavLink
                    className="nav-link"
                    to="/"
                    exact
                > Home
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink
                    className="nav-link"
                    to="/about"
                > Summary
                </NavLink>
            </li>
            <li className="nav-item">
                <button
                    onClick={handleLogout}
                >
                    Logout
                </button>
                {/*<NavLink*/}
                {/*    className="nav-link"*/}
                {/*    to="/login"*/}
                {/*> Logout*/}
                {/*</NavLink>*/}
            </li>
        </ul>
    </nav>
)
