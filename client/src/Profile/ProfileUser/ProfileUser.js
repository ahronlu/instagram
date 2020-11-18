import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../user-context";
import Avatar from "../../common/Avatar/Avatar";

const ProfileUser = ({ postsCount, userId }) => {
  const { user } = useContext(UserContext);
  const [profile, setProfile] = useState({});
  const [postCount, setPostCount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFollowed, setIsFollowed] = useState(false);
  const [followers, setFollowers] = useState([]);

  const isProfileOwner = user._id === userId;

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
      setIsFollowed(data.followers.some((id) => id === user._id));
      setFollowers(data.followers);
    }
    getProfile();
  }, [userId, user]);

  const follow = async () => {
    try {
      if (isFollowed) {
        await axios.delete(`/users/${userId}/unfollow/${user._id}`);
        setIsFollowed(false);
        setFollowers(followers.filter((id) => id === userId));
      } else {
        await axios.post(`/users/${userId}/follow`, {
          useCredentials: true,
        });
        setIsFollowed(true);
        setFollowers([...followers, userId]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="d-flex">
      {profile.username && !loading && (
        <>
          <Avatar size="lg" image={profile.avatar} />
          <div>
            <div>
              <div className="d-flex align-items-center">
                <h2
                  style={{ display: "inline-block" }}
                  className="display-5 mr-3"
                >
                  {profile.username}
                </h2>
                {isProfileOwner ? (
                  <Link className="btn btn-outline-dark" to="/profile/edit">
                    Edit Profile
                  </Link>
                ) : (
                  <button className="btn btn-outline-dark" onClick={follow}>
                    {isFollowed ? "Unfollow" : "Follow"}
                  </button>
                )}
              </div>
              <p>{profile.bio}</p>
            </div>
            <span>{postCount ? postCount : 0} posts</span>
            <span>{followers.length} followers</span>
            <span>{profile.following.length} following</span>
          </div>
        </>
      )}
    </div>
  );
};

export default ProfileUser;
