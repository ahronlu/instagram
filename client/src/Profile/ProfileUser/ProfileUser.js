import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../user-context";
import Avatar from "../../common/Avatar/Avatar";

const ProfileUser = ({ postCount, userId }) => {
  const { user, setUser } = useContext(UserContext);
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [isFollowed, setIsFollowed] = useState(false);
  const [followers, setFollowers] = useState([]);
  const [editBio, setEditBio] = useState(false);
  const [bio, setBio] = useState("");

  const isProfileOwner = user._id === userId;

  useEffect(() => {
    async function getProfile() {
      const { data } = await axios(`/users/${userId}`);
      setProfile(data);
      setLoading(false);
      setIsFollowed(data.followers.some((id) => id === user._id));
      setFollowers(data.followers);
      setBio(data.bio);
    }
    getProfile();
  }, [userId, user]);

  const updateBio = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`/users`, { bio });
      setUser(data);
      setEditBio(false);
    } catch (err) {
      console.error(err);
    }
  };

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
                {!isProfileOwner && (
                  <button className="btn btn-outline-dark" onClick={follow}>
                    {isFollowed ? "Unfollow" : "Follow"}
                  </button>
                )}
              </div>
              {isProfileOwner ? (
                <form onSubmit={updateBio}>
                  <input
                    style={{ background: "transparent", border: 0 }}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    // disabled={!editBio}
                  />

                  <i
                    className="fas fa-edit"
                    onClick={() => setEditBio(!editBio)}
                  ></i>
                </form>
              ) : (
                <p>{bio}</p>
              )}
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
