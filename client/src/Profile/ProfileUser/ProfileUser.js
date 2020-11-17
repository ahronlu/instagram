import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../user-context";
import Avatar from "../../common/Avatar/Avatar";

const ProfileUser = ({ postsCount, userId }) => {
  const { user } = useContext(UserContext);
  const [profile, setProfile] = useState({});
  const [postCount, setPostCount] = useState(null);
  const isProfileOwner = user._id === userId;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (postsCount) {
      setPostCount(postsCount);
    }
  }, [postsCount]);

  useEffect(() => {
    async function getProfile() {
      const { data } = await axios(`/users/${userId}`);
      setProfile(data);
      setLoading(false);
    }
    getProfile();
  }, [userId]);

  return (
    <div className="d-flex">
      {profile.username && !loading && (
        <>
          <Avatar size="lg" image={profile.avatar} />
          <div>
            <div>
              <h2 style={{ display: "inline-block" }} className="display-5">
                {profile.username}
              </h2>
              {isProfileOwner ? (
                <Link className="btn btn-primary" to="/profile/edit">
                  Edit Profile
                </Link>
              ) : (
                <button className="btn primary text-white">Follow</button>
              )}

              <p>{profile.bio}</p>
            </div>
            <span>{postCount ? postCount : 0} posts</span>
            {/* <span>{profile.followers.length} followers</span>
            <span>{profile.following.length} following</span> */}
          </div>
        </>
      )}
    </div>
  );
};

export default ProfileUser;
