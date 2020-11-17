import React from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Formik, Form, Field } from "formik";
import { PostSchema } from "./post.schema";
import { ReactComponent as Add } from "./instagram-sketched.svg";
import "./PostCreate.scss";

const PostCreate = () => {
  const history = useHistory();

  const buildFormData = (values) => {
    const data = new FormData();
    for (const key in values) {
      data.append(key, values[key]);
    }
    return data;
  };

  const submit = async (values) => {
    const data = buildFormData(values);
    try {
      await axios.put(`/posts`, data);
      history.push("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="PostCreate">
      <Add style={{ margin: 10 }} />
      <Formik
        initialValues={{
          description: "",
          image: "",
        }}
        validationSchema={PostSchema}
        onSubmit={submit}
      >
        {({ isSubmitting, isValid, dirty, setFieldValue }) => (
          <Form>
            <div className="form-group">
              <input
                type="file"
                id="image"
                name="image"
                onChange={(e) => {
                  setFieldValue("image", e.currentTarget.files[0]);
                }}
              />
            </div>
            <div className="form-group">
              <Field
                as="textarea"
                className="form-control"
                id="description"
                name="description"
                placeholder="Description"
              />
            </div>
            <button
              type="submit"
              className="btn primary form-control"
              disabled={!dirty || !isValid || isSubmitting}
            >
              {!isSubmitting ? "Create Post" : "Loading"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default PostCreate;
