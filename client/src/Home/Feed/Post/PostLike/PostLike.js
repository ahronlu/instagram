import React, { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../../../../user-context";
import "./PostLike.scss";

function PostLike(props) {
  const { user } = useContext(UserContext);
  const [likes, setLikes] = useState(props.likes);
  const [hasLiked, setHasLiked] = useState(hasUserLiked());

  function hasUserLiked() {
    return props.likes.includes(user._id);
  }

  async function like() {
    const url = `/posts/${props.postId}/likes`;
    const { data } = await axios.post(url);
    return data;
  }

  async function unlike() {
    const url = `/posts/${props.postId}/likes/${user._id}`;
    const { data } = await axios.delete(url);
    return data;
  }

  async function setLikeStatus(status) {
    setHasLiked(status);
    try {
      const post = status ? await like() : await unlike();
      setLikes(post.likes);
    } catch (err) {
      console.log(err);
    }
  }

  const likedClass = hasLiked ? "PostLike__heart--liked" : "";

  return (
    <div className="PostLike">
      <span
        className={`PostLike__heart ${likedClass}`}
        onClick={() => setLikeStatus(!hasLiked)}
      >
        <i className={`fa${hasLiked ? "" : "r"} fa-heart`}></i>
      </span>
      <span>{likes.length} likes</span>
    </div>
  );
}

export default PostLike;
