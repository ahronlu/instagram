import React from "react";
import { Link } from "react-router-dom";
import User from "./User/User";

const SearchResultUser = ({ users }) => {
  return (
    <div className="d-flex">
      {users.map((user) => (
        <Link key={user._id} to={`/profile/${user._id}`} key={user.id}>
          <User user={user} />
        </Link>
      ))}
    </div>
  );
};

export default SearchResultUser;
