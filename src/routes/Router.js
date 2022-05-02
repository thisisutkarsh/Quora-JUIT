import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router";
import { Home, Login } from "../components";
import { Error } from "../components/error/Error.jsx";
import { Navbar } from "../components/Navbar/Navbar";
import SideNav from "../components/Navbar/SideNav.jsx";
import { Notification } from "../components/Notifications/Notification";
import { PostPage } from "../components/post-page/PostPage";
import Chat from "../components/sendMessage/Chat";
import Unanswered from "../components/unanswered/Unanswered";
import { auth } from "../config/firebase.config";
import { login, logout, selectUser } from "../features/userSlice";
import RestrictedRoute from "./RestrictedRoute";

const Router = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(login(user));
      } else {
        dispatch(logout());
      }
    });
  }, [dispatch]);

  return (
    <Switch>
      {/* Restricted Route will not allow LoggedIn User to access login page */}

      <RestrictedRoute restricted={true} path="/" component={Login} exact />
      {/* <Route path="/" exact>
        {user ? <Redirect to="/home" /> : <Redirect to="/" />}
      </Route> */}

      <Route path="/home" exact>
        {user ? (
          <>
            <Navbar />
            <SideNav />
            <Home />
          </>
        ) : (
          <>
            <Redirect to="/" />
          </>
        )}
      </Route>

      <Route exact path="/question/:question_id">
        {user ? (
          <>
            <Navbar />
            <PostPage />
          </>
        ) : (
          <Redirect to="/" />
        )}
      </Route>

      <Route path="/notifications" exact>
        {user ? (
          <>
            <Navbar />
            <Notification />
          </>
        ) : (
          <Redirect to="/" />
        )}
      </Route>

      <Route path="/chat" exact>
        {user ? (
          <>
            <Navbar />
            <Chat />
          </>
        ) : (
          <Redirect to="/" />
        )}
      </Route>
      <Route path="/answers" exact>
        {user ? (
          <>
            <Navbar />
            <Unanswered />
          </>
        ) : (
          <Redirect to="/" />
        )}
      </Route>
      <Route path="*">
        {/* <Navbar /> */}
        <Error />
      </Route>
    </Switch>
  );
};

export default Router;
