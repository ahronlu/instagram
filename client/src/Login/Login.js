import React, { useContext, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";
import { Formik, Form, Field } from "formik";
import { LoginSchema } from "./login.schema";
import "./Login.scss";
import { UserContext } from "../user-context";

const Login = () => {
  const [error, setError] = useState(false);
  const { setUser } = useContext(UserContext);
  const history = useHistory();

  const submit = async (values) => {
    setError(false);
    const res = await axios.post(`/users/login`, values, { withCredentials: true });
    if (res.status === 200) {
      const loggedUser = res.data;
      setUser(loggedUser);
      history.push("/");
    } else if (res.status === 401) {
      setError(true);
    } else {
      console.error("Unknown error");
    }
    return res;
  };

  return (
    <div className="row Login">
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
          <Formik
            initialValues={{
              username: "",
              password: "",
            }}
            validationSchema={LoginSchema}
            onSubmit={submit}
          >
            {({ isValid, dirty, isSubmitting }) => (
              <Form>
                {error ? (
                  <p className="text-danger">
                    Invalid credentials, please try again.
                  </p>
                ) : (
                  <p></p>
                )}
                <div className="form-group">
                  <Field
                    type="text"
                    className={`form-control ${error && "error"}`}
                    name="username"
                    placeholder="Username"
                  />
                </div>
                <div className="form-group">
                  <Field
                    type="password"
                    className={`form-control ${error && "error"}`}
                    name="password"
                    placeholder="Password"
                  />
                </div>
                <button
                  type="submit"
                  className="btn primary"
                  disabled={!dirty || !isValid || isSubmitting}
                >
                  {!isSubmitting ? "Log In" : "Logging you in.."}
                </button>
              </Form>
            )}
          </Formik>
        </div>
        <div className="signup">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
