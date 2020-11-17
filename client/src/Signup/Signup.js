import React from "react";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { SignupSchema } from "./signup.schema";
import "./Signup.scss";

const Signup = () => {
  const history = useHistory();

  const submit = async (values) => {
    try {
      await axios.put(`/users`, values);  
      history.push("/login");
    } catch (err) {
      console.log("Unknown error");
    }
  };

  return (
    <div className="row Signup">
      <div className="d-none d-lg-block d-xl-block">
        <img src="login.png" alt="login" />
      </div>
      <div className="column text-center">
        <div>
          <img
            src="instagram.png"
            alt="logo"
            className="logo"
            style={{ width: 175 }}
          />
          <h2>Sign up to see photos and videos from your friends.</h2>
          <Formik
            initialValues={{
              username: "",
              password: "",
              email: "",
            }}
            validationSchema={SignupSchema}
            validateOnChange={true}
            onSubmit={submit}
          >
            {({ isSubmitting, dirty, isValid }) => (
              <Form noValidate>
                <div className="form-group">
                  <Field
                    type="text"
                    className="form-control"
                    id="username"
                    name="username"
                    placeholder="Username"
                  />
                  <ErrorMessage
                    component="small"
                    name="username"
                    className="Register__form__error"
                  />
                </div>
                <div className="form-group">
                  <Field
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    placeholder="Email Address"
                  />
                  <ErrorMessage
                    component="small"
                    name="email"
                    className="Register__form__error"
                  />
                </div>
                <div className="form-group">
                  <Field
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    placeholder="Password"
                  />
                  <ErrorMessage
                    component="small"
                    name="password"
                    className="Register__form__error"
                  />
                </div>
                <button
                  type="submit"
                  className="btn primary"
                  disabled={isSubmitting || !dirty || !isValid}
                >
                  {!isSubmitting ? "Sign up" : "Signinng you up"}
                </button>
                <p className="terms">
                  By signing up, you agree to our <b>Terms</b> ,{" "}
                  <b>Data Policy</b> and
                  <b>Cookies Policy</b>.
                </p>
              </Form>
            )}
          </Formik>
        </div>
        <div className="login">
          Have an account? <Link to="/login">Log in</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
