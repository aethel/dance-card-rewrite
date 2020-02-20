import React from "react";
import { RouteComponentProps } from "@reach/router";
import Firebase, { FirebaseContext } from "../Firebase/firebase";
import { UserProvider } from "../Contexts/user.context";
import { ProfileProvider } from "../Contexts/profile.context";
import ChatsListComponent from "../Components/ChatsList/ChatsList.component";

export const ChatsListPage = (_: RouteComponentProps) => {
  return (
    <FirebaseContext.Consumer>
      {(firebase: Firebase) => {
        return (
          <UserProvider>
            <ProfileProvider>
              <ChatsListComponent firebase={firebase} />
            </ProfileProvider>
          </UserProvider>
        );
      }}
    </FirebaseContext.Consumer>
  );
};
