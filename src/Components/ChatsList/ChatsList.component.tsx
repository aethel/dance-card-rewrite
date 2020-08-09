import React, { FunctionComponent, useState, useEffect, Fragment } from "react";
import Firebase from "../../Firebase/firebase";
import { useUser } from "../../Contexts/user.context";
import ChatInputComponent from "../ChatInput/ChatInput.component";
import "./ChatsList.component.css";
import { useMsgNotification } from "../../Contexts/messageNotification.context";
import { isObjectWithValue } from "../../Utils/object";
import { sortMessagesDesc, sortChatsDesc } from "../../Utils/array";

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
    getChats(false)
    // return () => unsubscribe()
  }, [user, msg]);

  const getChats = (initial = true): any => {
    let unsubscribe: any = undefined;
    if (user?.uid) {
      unsubscribe = firebase!
        .getChats()
        .where("members", "array-contains", user.uid)
        .get()
        .then((res: firebase.firestore.DocumentData) => {
          const sortedRes = res?.docs?.sort(sortChatsDesc);
          setState((prevState: any): any => {
            console.log('res.docs', res.docs)
            console.log('prevState', prevState)
            if (prevState?.length < sortedRes?.length) {
              return sortedRes
            } else {
              setState(sortedRes);
            }
          });
        });
    }
  }

  return (
    <div className='container'>
      {!state?.length && <p>no chats</p>}
      {console.log('state', state)}
      {state?.map(
        (item: firebase.firestore.QueryDocumentSnapshot, index: number) => {
          const messages = isObjectWithValue(item.data(), 'messages') ? item.data().messages.sort(sortMessagesDesc) : undefined;
          console.log('messages', messages)
          console.log('state', state)
          const existingChatID: string = item.id;
          const targetUserID = () =>
            item.data().members.find((id: string) => id !== user.uid);
          return (
            <div key={`${index}${targetID}`}>{messages ?
              <details className="container" >
                <summary>
                  {messages[0].fromName},
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
                      <div className={item.fromID === user.uid ? 'messageBoxFrom' : 'messageBoxTo'} key={`${index}`}>
                        <strong> From: {item.fromName}</strong> <p>{item.message}</p>
                      </div>
                    )
                )}
                <ChatInputComponent
                  firebase={firebase}
                  routeProps={{ targetUserID: targetUserID(), existingChatID }}
                />
              </details> : <p>No Could be a faulty chat.</p>}
            </div>
          );
        }
      )}
    </div>
  );
};

export default ChatsListComponent;
