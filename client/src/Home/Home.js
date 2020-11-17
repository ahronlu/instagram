import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Feed from "./Feed/Feed";
import { UserContext } from "../user-context";
import Avatar from "../common/Avatar/Avatar";
import "./Home.scss";

const Home = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="Home row">
      <div className="col-lg-8 p-0">
        {user && <Feed />}
      </div>
      <div className="col-lg-4 p-0 pl-4 pt-4 d-none d-lg-block">
        {user && (
          <Link to={`/profile/${user._id}`}>
            {user.avatar && (
              <Avatar size="md" image={user.avatar} alt={user.username} />
            )}
            <span className="ml-2 font-weight-bold" title={user.username}>
              {user.username}
            </span>
          </Link>
        )}
        <h6 className="suggestions">Suggestions For You</h6>
      </div>
    </div>
  );
};

export default Home;
