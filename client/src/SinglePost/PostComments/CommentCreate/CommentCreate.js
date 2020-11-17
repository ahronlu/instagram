import React, { useState } from "react";
import axios from "axios";
import "./CommentCreate.scss";

const CommentCreate = ({ postId, onAddComment }) => {
  const [content, setContent] = useState("");

  const postComment = async (e) => {
    e.preventDefault();
    const { data } = await axios.put(`/posts/${postId}/comment`, {content});
    onAddComment(data);
    setContent("");
  };

  return (
    <form className="CommentCreate" onSubmit={postComment}>
      <input
        type="text"
        placeholder="Add a comment..."
        onChange={(e) => setContent(e.target.value)}
        value={content}
      />
      <button disabled={!content}>Post</button>
    </form>
  );
};
export default CommentCreate;
