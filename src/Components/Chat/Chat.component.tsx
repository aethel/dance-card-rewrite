import React, { FunctionComponent, useState, FormEvent } from "react";
import Firebase from "../../Firebase/firebase";
import { useUser } from "../../Contexts/user.context";
import { useProfile } from "../../Contexts/profile.context";
import { GeoDocumentReference } from "geofirestore/dist/GeoDocumentReference";
import { GeoFirestoreTypes } from "geofirestore/dist/GeoFirestoreTypes";
import { Profile } from "../../Models/profile.models";

type Props = {
  firebase: Firebase;
  targetID?: { [key: string]: string } | null;
};

const ChatComponent: FunctionComponent<Props> = ({ firebase, targetID }) => {
  const [message, setMessage] = useState<string>();
  const [currentChatId, setCurrentChatId] = useState<string | undefined>(undefined);
  const { user } = useUser();
  const { profile, setProfile } = useProfile();

  const updateChatsIdInProfile = (chatID: string) => {
    if ((profile.chats as string[]).includes(chatID)) {
      return;
    }
    const chats: string[] = [...profile.chats, chatID];
    const newProfile = { ...profile, chats };
    
    updateUsersChatIds(chatID,user.uid!).then(() => setProfile(newProfile as Profile)).catch(e => console.log(e)
    );
    updateUsersChatIds(chatID,targetID!.targetID).catch(e => console.log(e));
  };

  const updateUsersChatIds = (chatID:string,userID: string):Promise<any> => {
    const document: GeoDocumentReference = firebase.getUsers().doc(userID);
   return document.update({ chats: firebase.fieldValue.arrayUnion(chatID) });
  }


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
        .collection("messages")
        .doc()
        .set({ message: message, timestamp:+new Date() });
    } else {
      firebase
        .getChats()
        .add({ members: [targetID!.targetID, user.uid] })
        .then(refID => {
          setCurrentChatId(refID.id);
          updateChatsIdInProfile(refID.id);
          refID
            .collection("messages")
            .doc()
            .set({ message: message, timestamp:+new Date() });
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

export default ChatComponent;
