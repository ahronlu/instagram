import React, { useEffect, useState } from "react";
import axios from "axios";
import PostComment from "./PostComment/PostComment";
import CommentCreate from "./CommentCreate/CommentCreate";

const PostComments = ({ postId }) => {
  const [comments, setComments] = useState([]);

  const addComment = (newComment) => {
    setComments([...comments, newComment]);
  };

  const deleteComment = async (id) => {
    try {
      await axios.delete(`/comment/${id}`, { withCredentials: true })
      setComments(comments.filter(comment => comment._id !== id));
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    async function getComments() {
      try {
        const { data } = await axios(`/posts/${postId}/comment`,{ withCredentials: true });
        setComments(data);
      } catch (err) {
        console.log(err);
      }
    }

    getComments();
  }, [postId]);
  return (
    <div>
      {comments.map((comment) =>
        <PostComment
          key={comment._id}
          comment={comment}
          deleteComment={deleteComment}
        />
      )}
      <CommentCreate postId={postId}  onAddComment={addComment} />
    </div>
  );
};

export default PostComments;
