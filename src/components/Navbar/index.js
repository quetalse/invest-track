import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { logOut } from "../../store/actions/auth";

import "./styles.scss";

export const Navbar = () => {

    const user = useSelector(state => state.auth.user)

    return (
        <nav className="app-navbar">
            <div className="app-navbar__logo">
                Invest track
            </div>
            <ul className="app-navbar__menu">
                <li className="app-navbar__item">
                    <NavLink
                        className="app-navbar__button"
                        activeClassName="app-navbar__button-active"
                        to="/about"
                        exact
                    > About
                    </NavLink>
                </li>
                {user && <li className="app-navbar__item">
                    <NavLink
                        className="app-navbar__button"
                        activeClassName="app-navbar__button-active"
                        to="/"
                        exact
                    > Home
                    </NavLink>
                </li>}
                {user && <li className="app-navbar__item">
                    <NavLink
                        className="app-navbar__button"
                        activeClassName="app-navbar__button-active"
                        to="/overview"
                    > Summary
                    </NavLink>
                </li>}
                {user && <li className="app-navbar__item">
                    <NavLink
                        className="app-navbar__button"
                        activeClassName="app-navbar__button-active"
                        to="/news"
                    > News
                    </NavLink>
                </li>}
                {user && <li className="app-navbar__item app-navbar__item-right">
                    <span
                        className="app-navbar__button"
                        onClick={logOut}
                    >
                        Logout
                    </span>
                    </li>}
            </ul>
        </nav>
    )
}
