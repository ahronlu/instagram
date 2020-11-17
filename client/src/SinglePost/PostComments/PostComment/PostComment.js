import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../../user-context.js";
import PostDate from "../../../Home/Feed/Post/PostDate";
import Avatar from "../../../common/Avatar/Avatar";

const PostComment = ({ comment, deleteComment }) => {
  const { user } = useContext(UserContext);

  return (
    <div className="PostComment" style={{ margin: 0, display: "flex" }}>
      <Link to={`/profile/${comment.user._id}`}>
        <Avatar
          size="sm"
          image={comment.user.avatar}
          alt={comment.user.username}
        />
      </Link>
      <div>
        <Link to={`/profile/${comment.user._id}`}>
          <span className="font-weight-bold mr-2" title={comment.user.username}>
            {comment.user.username}
          </span>
        </Link>
        {comment.content}
        <PostDate
          date={comment.createdAt}
          style={{ display: "inline-block" }}
        />
      </div>
      {user._id === comment.user._id ? (
        <i
          onClick={() => deleteComment(comment._id)}
          className="fas fa-trash"
        ></i>
      ) : (
        ""
      )}
    </div>
  );
};

export default PostComment;
