import React from "react";
import PropTypes from "prop-types";
import "./Avatar.scss";

const Avatar = ({ image, size, alt }) => {
  return <img src={image} alt={alt} className={`Avatar ${size}`} />;
};

Avatar.propTypes = {
  image: PropTypes.string.isRequired,
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  alt: PropTypes.string,
};

export default Avatar;
