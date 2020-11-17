import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Avatar from "../common/Avatar/Avatar";
import "../Home/Feed/Post/Post.scss";
import PostDate from "../Home/Feed/Post/PostDate";
import PostLike from "../Home/Feed/Post/PostLike/PostLike";
import AppLoader from "../AppLoader/AppLoader";
import { useEffect } from "react";
import PostComments from "./PostComments/PostComments";

const SinglePost = ({ match }) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getPost() {
      try {
        const { data } = await axios(`/posts/${match.params.id}`);
        setData(data);
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    }
    getPost();
  }, [match]);

  return (
    <article className="Post row">
      {!data.user && loading ? (
        <AppLoader />
      ) : (
        <>
          <div className="col-lg-8 p-0">
            <img
              style={{ width: "100%" }}
              src={`/posts/${data.image}`}
              alt={data.description}
            />
          </div>
          <div className="col-lg-4 p-0">
            <Link to={`/profile/${data.user._id}`}>
              <Avatar
                size="sm"
                image={data.user.avatar}
                alt={data.user.username}
              />
              <span
                className="font-weight-bold pl-2"
                title={data.user.username}
              >
                {data.user.username}
              </span>
            </Link>
            <hr style={{ margin: 0 }} />
            <div className="content col-12 p-0">
              <Link to={`/profile/${data.user._id}`}>
                <Avatar
                  size="sm"
                  image={data.user.avatar}
                  alt={data.user.username}
                />
                <span
                  className="font-weight-bold pl-2 pr-2"
                  title={data.user.username}
                >
                  {data.user.username}
                </span>
              </Link>
              {data.description}
            </div>
            <div className="actions col-12">
              <PostLike likes={data.likes} postId={data._id} />
              <i className="far fa-comment"></i>
            </div>
            <div className="ml-3">
              <PostDate date={data.createdAt} />
            </div>
            <hr />
            <PostComments postId={data._id} />
          </div>
        </>
      )}
    </article>
  );
};

export default SinglePost;
