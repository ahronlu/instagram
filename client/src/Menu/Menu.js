import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UserContext } from "../user-context";
import {
  faHome,
  faPlusSquare,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";

import MenuAvatar from "./MenuAvatar/MenuAvatar";
import "./Menu.scss";

const Header = () => {
  const { user } = useContext(UserContext);

  // const logout = async () => {
        // await axios(`/users/logout`);
  // };

  return (
    <nav
      className="Menu navbar navbar-expand navbar bg-white"
      style={{ borderBottom: "1px solid #dbdbdb" }}
    >
      <div className="container">
        <Link
          className="navbar-brand d-none d-lg-block"
          to="/"
          style={{ fontWeight: "bold" }}
        >
          <img src="/instagram.png" alt="instagram" className="instagram" />
        </Link>
        <ul
          className="Menu navbar-nav mr-auto d-flex flex-grow-1 justify-content-around justify-content-lg-end"
        >
          <li className="nav-item active">
            <Link className="nav-link" to="/" title="Home">
              <FontAwesomeIcon icon={faHome} />
            </Link>
          </li>
          <li className="nav-item active">
            <Link className="nav-link" to="/search" title="Search Username">
              <FontAwesomeIcon icon={faSearch} />
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/post/create" title="Create Post">
              <FontAwesomeIcon icon={faPlusSquare} />
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to={`/profile/${user._id}`}
              className="nav-link"
              title={user.username}
            >
              <MenuAvatar />
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
