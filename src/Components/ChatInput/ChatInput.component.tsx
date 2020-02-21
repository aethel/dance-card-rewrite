import React, { FunctionComponent, useState, FormEvent, useEffect } from "react";
import Firebase from "../../Firebase/firebase";
import { useUser } from "../../Contexts/user.context";
import { useProfile } from "../../Contexts/profile.context";
import { GeoDocumentReference } from "geofirestore/dist/GeoDocumentReference";
import { GeoFirestoreTypes } from "geofirestore/dist/GeoFirestoreTypes";
import { Profile } from "../../Models/profile.models";
import { RouterProps } from "@reach/router";

type Props = {
  firebase: Firebase;
  routeProps: any;
};

const ChatInputComponent: FunctionComponent<Props> = ({ ...props }) => {
  const { firebase } = props;
  const { targetUserID, existingChatID } = props.routeProps;
  const [message, setMessage] = useState<string>();
  const [currentChatId, setCurrentChatId] = useState<string | undefined>(
    undefined
  );
  const { user } = useUser();
  const { profile, setProfile } = useProfile();

useEffect(() => {
  if(existingChatID) {
    setCurrentChatId(existingChatID);
  }
}, [])


  const updateChatsIdInProfile = (chatID: string) => {
    if ((profile.chats as string[]).includes(chatID)) {
      return;
    }
    const chats: string[] = [...profile.chats, chatID];
    const newProfile = { ...profile, chats };
    //if target id === user.uid, cancel
    updateUsersChatIds(chatID, user.uid!)
      .then(() => setProfile(newProfile as Profile))
      .catch(e => console.log(e));
    updateUsersChatIds(chatID, targetUserID).catch(e => console.log(e));
  };

  const updateUsersChatIds = (chatID: string, userID: string): Promise<any> => {
    const document: GeoDocumentReference = firebase.getUsers().doc(userID);
    return document.update({ chats: firebase.fieldValue.arrayUnion(chatID) });
  };

  // const chatIdExists = async (IDsArray: string[]) => {
  //   let requests: any = [];
  //   IDsArray.forEach((id: string) => {
  //     requests.push(
  //       firebase
  //         .getChats()
  //         .doc(id)
  //         .get()
  //     );
  //   });
  //   const result = await Promise.all(requests);
  //   return !!result.length;
  // };

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    if (currentChatId) {
      firebase
        .getChats()
        .doc(currentChatId)
        .update({
          messages: firebase.fieldValue.arrayUnion({
            fromName: profile.username,
            fromID: user.uid,
            message: message,
            timestamp: +new Date()
          }),
          last_updated: +new Date()
        });
    } else {
      firebase
        .getChats()
        .add({ members: [targetUserID, user.uid], last_updated: +new Date() })
        .then(refID => {
          setCurrentChatId(refID.id);
          updateChatsIdInProfile(refID.id);
          refID.update({
            messages: firebase.fieldValue.arrayUnion({
              fromName: profile.username,
              fromID: user.uid,
              message: message,
              timestamp: +new Date()
            })
          });
        });
    }
  };

  return (
    <form onSubmit={submitHandler}>
      is a chat
      <input
        type="text"
        name="message"
        placeholder="write message"
        onChange={event => setMessage(event.target.value)}
      />
      <button type="submit">send</button>
    </form>
  );
};

export default ChatInputComponent;
