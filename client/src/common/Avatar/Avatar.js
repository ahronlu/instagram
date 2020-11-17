import React from "react";
import PropTypes from "prop-types";
import "./Avatar.scss";

const Avatar = ({ image, size, alt }) => {
  return (
    <img src={`/avatars/${image}`} alt={alt} className={`Avatar ${size}`} />
  );
};

Avatar.propTypes = {
  image: PropTypes.string,
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  alt: PropTypes.string,
};

export default Avatar;
