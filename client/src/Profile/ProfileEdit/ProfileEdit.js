import React, { useContext, useState, useRef } from "react";
import { UserContext } from "../../user-context";
import CropAvatar from "./CropAvatar/CropAvatar";
import "./ProfileEdit.scss";

function ProfileEdit(props) {
  const { user, setUser } = useContext(UserContext);
  const cropAvatarRef = useRef(null);
  const [values, setValues] = useState({ bio: "", avatar: "" });

  const buildFormData = (values) => {
    for (let key in values) {
      if (values[key] === undefined) {
        delete values[key];
      }
    }
    const data = new FormData();
    for (let key in values) {
      data.append(key, values[key]);
    }
    return data;
  };

  const submit = async (e, values) => {
    e.preventDefault();
    const avatar = await cropAvatarRef.current.showResult();
    const updatedValues = { ...values, avatar };
    const data = buildFormData(values);
    const req = await fetch(`/users/${user._id}`, {
      method: "POST",
      credentials: "include",
      body: data,
    });
    const editedUser = await req.json();
    setUser(editedUser);
  };

  return (
    <>
      <h1>Edit Profile</h1>
      <form onSubmit={submit} className="form d-flex flex-column h-100">
        <div className="col-12 cropper-container">
          <CropAvatar avatarImage={user.avatar} ref={cropAvatarRef} />
        </div>
        <div className="ProfileEdit-inputs-container">
          <div className="form-group my-2">
            <input
              type="text"
              className="form-control"
              id="bio"
              placeholder="Bio"
              name="bio"
            />
          </div>
        </div>
        <button>Save Changes</button>
      </form>
    </>
  );
}

export default ProfileEdit;
