import React from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../../user-context";
import Avatar from "../../../common/Avatar/Avatar";
import PostDate from "./PostDate";
import PostLike from "./PostLike/PostLike";
import { useContext } from "react";
import "./Post.scss";

const Post = ({ data, deletePost }) => {
  const { user } = useContext(UserContext);

  return (
    <article className="Post">
      {data && (
        <>
          <Link to={`/profile/${data.user._id}`}>
            <Avatar
              size="sm"
              image={data.user.avatar}
              alt={data.user.username}
            />
            <span
              className="font-weight-bold pl-2 pr-3"
              title={data.user.username}
            >
              {data.user.username}
            </span>
          </Link>
          {data.user._id === user._id && (
            <button
              className="btn btn-outline-danger"
              onClick={() => deletePost(data._id)}
            >
              Remove
            </button>
          )}
          <img
            style={{ width: "100%" }}
            src={`/posts/${data.image}`}
            alt={data.description}
          />
          <div className="actions col-12">
            <PostLike likes={data.likes} postId={data._id} />
            <Link to={`/post/${data._id}`}>
              <i className="far fa-comment"></i>
            </Link>
          </div>
          <div className="content col-12">
            <span className="font-weight-bold mr-2" title={data.user.username}>
              {data.user.username}
            </span>
            {data.description}
            <PostDate date={data.createdAt} />
          </div>
        </>
      )}
    </article>
  );
};

export default Post;
