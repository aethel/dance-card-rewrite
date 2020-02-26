import React, { FunctionComponent, useState, useEffect } from "react";
import Firebase from "../../Firebase/firebase";
import { useUser } from "../../Contexts/user.context";
import ChatInputComponent from "../ChatInput/ChatInput.component";
import "./ChatsList.component.css";
import { useMsgNotification } from "../../Contexts/messageNotification.context";

type Props = {
  firebase: Firebase;
  targetID?: { [key: string]: string } | null;
};

const ChatsListComponent: FunctionComponent<Props> = ({
  firebase,
  targetID
}) => {
  // QueryDocumentSnapshot
  const [state, setState] = useState<[]>();
  const { user } = useUser();
  const { msg } = useMsgNotification();

  useEffect(() => {
    let unsubscribe: any = undefined;
    if (user?.uid) {
      unsubscribe = firebase!
        .getChats()
        .where("members", "array-contains", user.uid)
        .get()
        .then((res: firebase.firestore.DocumentData) => {
          setState(res.docs);
        });
    }
    // return () => unsubscribe()
  }, [user, msg]);
  return (
    <div className='container'>
      {!state?.length && <p>no chats</p>}
      {state?.map(
        (item: firebase.firestore.QueryDocumentSnapshot, index: number) => {
          const messages = item.data().messages;
          const read = item.data().messages.length;

          const existingChatID: string = item.id;
          const targetUserID = () =>
            item.data().members.find((id: string) => id !== user.uid);
          return (
            <details className="container" key={`${index}${targetID}`}>
              <summary>
                {messages[0].fromName},{" "}
                {new Date(messages[0].timestamp).toLocaleDateString("en-GB", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric"
                })}
              </summary>
              {messages.map(
                (
                  item: {
                    message: string;
                    timestamp: number;
                    fromName: string;
                    fromID: string;
                  },
                  index: number
                ) => (
                  <div className={item.fromID === user.uid ? 'messageBoxFrom': 'messageBoxTo' } key={`${index}`}>
                    <strong> From: {item.fromName}</strong> <p>{item.message}</p>
                  </div>
                )
              )}
              <ChatInputComponent
                firebase={firebase}
                routeProps={{ targetUserID: targetUserID(), existingChatID }}
              />
            </details>
          );
        }
      )}
    </div>
  );
};

export default ChatsListComponent;
