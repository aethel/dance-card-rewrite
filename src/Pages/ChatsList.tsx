import React from "react";
import { RouteComponentProps } from "@reach/router";
import Firebase, { FirebaseContext } from "../Firebase/firebase";
import { UserProvider } from "../Contexts/user.context";
import { ProfileProvider } from "../Contexts/profile.context";
import ChatsListComponent from "../Components/ChatsList/ChatsList.component";
import NavigationComponent from "../Components/Header/Navigation.component";

export const ChatsListPage = (_: RouteComponentProps) => {
  return (
    <FirebaseContext.Consumer>
      {(firebase: Firebase) => {
        return (
          <UserProvider>
            <ProfileProvider>
              <NavigationComponent firebase={firebase}/>
              <ChatsListComponent firebase={firebase} />
            </ProfileProvider>
          </UserProvider>
        );
      }}
    </FirebaseContext.Consumer>
  );
};
