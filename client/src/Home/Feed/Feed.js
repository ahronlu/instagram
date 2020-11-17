import React, { useState, useEffect } from "react";
import axios from "axios";
import Post from "./Post/Post";
import "./Feed.scss";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let source = axios.CancelToken.source();

    async function getPosts() {
      const { data } = await axios(`/posts?sort=-1`, {
        cancelToken: source.token,
      });
      setLoading(false);
      setPosts(data);
    }

    getPosts();
    return function () {
      source.cancel();
    };
  }, []);

  const deletePost = async (postId) => {
    try {
      await axios.delete(`/posts/${postId}`);
      setPosts(posts.filter((post) => post._id !== postId));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {loading ? (
        <h1>loading...</h1>
      ) : (
        <div className="feed">
          {posts.map((post) => (
            <Post key={post._id} data={post} deletePost={deletePost} />
          ))}
        </div>
      )}
    </>
  );
};

export default Feed;
