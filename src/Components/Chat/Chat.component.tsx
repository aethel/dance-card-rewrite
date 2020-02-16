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
  console.log(targetID!.targetID);
  const [message, setMessage] = useState<string>();
  const { user } = useUser();
  const { profile, setProfile } = useProfile();

  const updateChatsIdInProfile = (chatID: string) => {
    if ((profile.chats as string[]).includes(chatID)) {
      return;
    }
    const chats: string[] = [...profile.chats, chatID];
    const newProfile = { ...profile, chats };
    // const newProfile = {...profile, chats};
    // firebase.getUsers().doc(user.uid).set(newProfile, {merge:true}).then(res=> console.log(res));
    const document: GeoDocumentReference = firebase.getUsers().doc(user.uid);
    document
      .update({ chats: chats })
      .then(() => setProfile(newProfile as Profile));
  };

  const chatIdExists = async (IDsArray: string[]) => {
    let requests: any = [];
    IDsArray.forEach((id:string) => {
      requests.push(
        firebase
          .getChats()
          .doc(id)
          .get()
      );
    });
    const result = await Promise.all(requests);
    return !!result.length;
  };

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
   await chatIdExists(profile.chats);

    // firebase
    //   .getChats()
    //   .add({ members: [targetID!.targetID, user.uid] })
    //   .then(refID => {
    //     console.log(refID.id);
    //     updateChatsIdInProfile(refID.id);
    //     refID
    //       .collection("messages")
    //       .doc()
    //       .set({ message: message });
    //   });
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
