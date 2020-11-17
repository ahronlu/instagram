import React, { useContext, useRef } from "react";
import { Formik, Form, Field } from "formik";
import { ProfileEditSchema } from "./profileedit.schema";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../../user-context";
import CropAvatar from "./CropAvatar/CropAvatar";
import Button from "react-bootstrap/Button";
import "./ProfileEdit.scss";

function ProfileEdit(props) {
  const { user, setUser } = useContext(UserContext);
  const bioTextMaxLength = 31;
  const formRef = useRef(null);
  const cropAvatarRef = useRef(null);

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

  const submit = async (values) => {
    const avatar = await cropAvatarRef.current.showResult();
    const updatedValues = { ...values, avatar };
    const data = buildFormData(updatedValues);
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
      <Formik
        innerRef={formRef}
        initialValues={{ fullName: user.fullName, bio: user.bio, avatar: "" }}
        validationSchema={ProfileEditSchema}
        validateOnChange={true}
        validateOnBlur={true}
        onSubmit={submit}
      >
        {({ values, errors, isSubmitting, setFieldValue }) => (
          <Form className="form d-flex flex-column h-100" noValidate>
            <div className="col-12 cropper-container">
              <CropAvatar avatarImage={user.avatar} ref={cropAvatarRef} />
            </div>

            <div className="ProfileEdit-inputs-container">
              <div className="form-group my-2">
                <Field
                  className="form-control"
                  id="fullName"
                  placeholder="Full name"
                  name="fullName"
                />
                <FontAwesomeIcon
                  className="ProfileEdit-form-icon"
                  icon={faUser}
                />
                {errors.fullName && (
                  <small className="text-danger pl-2">{errors.fullName}</small>
                )}
              </div>

              <div className="form-group my-2">
                <Field
                  component="textarea"
                  maxLength={bioTextMaxLength}
                  className="form-control"
                  id="bio"
                  placeholder="Bio"
                  name="bio"
                />
                <FontAwesomeIcon
                  className="ProfileEdit-form-icon"
                  icon={faLock}
                />
                <span className="bio-counter float-right mt-2">
                  {values.bio && `${values.bio.length}/${bioTextMaxLength - 1}`}
                </span>
                {errors.bio && (
                  <small className="text-danger pl-2">{errors.bio}</small>
                )}
              </div>
            </div>
          </Form>
        )}
      </Formik>
      <Button variant="primary">Close</Button>
      <Button
        variant="primary"
        // disabled={formRef.current.isSubmitting()}
        onClick={async () => {
          await formRef.current.submitForm();
        }}
      >
        Save Changes
      </Button>
    </>
  );
}

export default ProfileEdit;
