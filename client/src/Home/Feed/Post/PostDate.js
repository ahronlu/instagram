import React from "react";
import moment from "moment";
import Moment from "react-moment";

const PostDate = ({ date }) => {
  return (
    <div
      className="text-uppercase text-secondary font-weight-light"
      title={moment(date).format("MMMM Do YYYY, h:mm:ss a")}
    >
      <small>
        <Moment fromNow>{date}</Moment>
      </small>
    </div>
  );
};

export default PostDate;
