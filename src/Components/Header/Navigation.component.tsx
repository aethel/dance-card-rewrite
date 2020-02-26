import React, { FunctionComponent, Fragment } from "react";
import Firebase from "../../Firebase/firebase";
import { navigate, Link } from "@reach/router";
import * as ROUTES from "../../Constants/routes";
import { useUser } from "../../Contexts/user.context";
import "./Navigation.component.css";
type Props = {
  firebase: Firebase;
};

const NavigationComponent: FunctionComponent<Props> = ({ firebase }: Props) => {
  const { clearUser } = useUser();
  const isLoggedIn = firebase.getCurrentUser();
  return (
    <div>
      <nav>
        <Link className="button" to={ROUTES.HOME}>
          Home
        </Link>
        <Link className="button" to={ROUTES.PROFILE}>
          Profile
        </Link>
        <Link className="button" to={ROUTES.CHATS}>
          Chats
        </Link>
      </nav>
      <button  className="button button-outline"
        onClick={() => {
          firebase.doSignOut();
          localStorage.clear();
          navigate(ROUTES.LOG_IN);
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default NavigationComponent;
