import React from "react";
import Avatar from "../../../common/Avatar/Avatar";
import "./User.scss";

const User = ({ user }) => {
  return (
    <div className="User d-flex p-3">
      <div>
        <Avatar size="sm" alt={user.username} image={user.avatar} />
      </div>
      <div>
        <h6>
          <b>{user.username}</b>
        </h6>
        <p className="m-0">{user.bio}</p>
      </div>
    </div>
  );
};

export default User;
