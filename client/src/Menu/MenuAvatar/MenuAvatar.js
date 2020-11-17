import React, { useContext } from "react";
import { UserContext } from "../../user-context";
import "./MenuAvatar.scss";
import Avatar from "../../common/Avatar/Avatar";

const MenuAvatar = () => {
  const { user } = useContext(UserContext);
  return (
    <div className="MenuAvatar">
      <Avatar alt="avatar" image={user.avatar} size="sm" />
    </div>
  );
};

export default MenuAvatar;
