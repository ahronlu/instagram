import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AppLoader from "../AppLoader/AppLoader";
import ProfileUser from "./ProfileUser/ProfileUser";
import "./Profile.scss";

const Profile = (props) => {
  const { id } = props.match.params;
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [postCount, setPostCount] = useState(0);

  useEffect(() => {
    async function getPosts() {
      const { data } = await axios(`/users/${id}/posts`);
      setPosts(data);
      setPostCount(data.length);
      setLoading(false);
    }

    getPosts();
  }, [id]);

  return (
    <>
      {loading ? (
        <AppLoader />
      ) : (
        <div className="Profile">
          <ProfileUser postCount={postCount} userId={id} />
          <div className="posts-grid">
            {posts.map((post) => (
              <Link to={`/post/${post._id}`} key={post._id}>
                <img src={`/posts/${post.image}`} alt={post} />
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
