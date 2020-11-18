import React, { useState, useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import Menu from "./Menu/Menu";
import Signup from "./Signup/Signup";
import Login from "./Login/Login";
import PostCreate from "./PostCreate/PostCreate";
import { UserContext } from "./user-context";
import { UserService } from "./services/user-service";
import Home from "./Home/Home";
import SinglePost from "./SinglePost/SinglePost";
import AppLoader from "./AppLoader/AppLoader";
import Profile from "./Profile/Profile";
import ProfileEdit from "./Profile/ProfileEdit/ProfileEdit";
import Search from "./Search/Search";
import "./App.scss";

function App() {
  const [isLoading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const history = useHistory();

  useEffect(() => {
    async function getUser() {
      const user = await UserService.get();
      setUser(user);
      setLoading(false);
      if (!user) {
        history.push("/login");
      }
    }
    getUser();
  }, [history]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {isLoading && <AppLoader />}
      <div className="d-flex flex-column flex-lg-column-reverse vh-100">
        <div className="main pl-0 pr-0 flex-grow-1">
          <div className="container mt-3">
            <Switch>
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
              <Route path="/post/create" component={PostCreate} />
              <Route path="/profile/edit" component={ProfileEdit} />
              <Route path="/profile/:id" component={Profile} />
              <Route path="/post/:id" component={SinglePost} />
              <Route path="/search" component={Search} />
              <Route path="/" component={Home} />
            </Switch>
          </div>
        </div>
        {user && <Menu />}
      </div>
    </UserContext.Provider>
  );
}

export default App;
