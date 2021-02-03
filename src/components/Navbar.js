// import { Fragment } from 'react';
import { NavLink } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { logOut } from "../store/actions/auth";


export const Navbar = () => {

    const user = useSelector(state => state.auth.user)

    return (
    <nav className="navbar navbar-dark navbar-expand-md app-navbar">
        <div className="navbar-brand">
            Invest track
        </div>
        <ul className="navbar-nav">
            <li className="nav-item">
                <NavLink
                    className="nav-link "
                    to="/"
                    exact
                > Home
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink
                    className="nav-link"
                    to="/overview"
                > Summary
                </NavLink>
            </li>
            {user && (
                <li className="nav-item">
                    <button
                        onClick={logOut}
                    >
                        Logout
                    </button>
                </li>
            )}

        </ul>
    </nav>
    )
}
