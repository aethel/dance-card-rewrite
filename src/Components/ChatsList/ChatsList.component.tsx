import React, {
  FunctionComponent,
  useState,
  FormEvent,
  useEffect,
  Fragment
} from "react";
import Firebase from "../../Firebase/firebase";
import { useUser } from "../../Contexts/user.context";
import { useProfile } from "../../Contexts/profile.context";
import { GeoDocumentReference } from "geofirestore/dist/GeoDocumentReference";
import { GeoFirestoreTypes } from "geofirestore/dist/GeoFirestoreTypes";
import { Profile } from "../../Models/profile.models";
import { Link } from "@reach/router";
import ChatInputComponent from "../ChatInput/ChatInput.component";
import * as ROUTES from '../../Constants/routes'
import  './ChatsList.component.css'
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
  }, [user,msg]);
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

  // console.log(item.data().messages)
  return (
    <div>
      {!state?.length && <p>no chats</p>}
      {state?.map(
        (item: firebase.firestore.QueryDocumentSnapshot, index: number) => {
          const messages = item.data().messages;
          const existingChatID:string = item.id;
          const targetUserID = () =>
            item.data().members.find((id: string) => id !== user.uid);
          return (
            <details className='chatBox' key={`${index}${targetID}`}>
              <summary>{messages[0].fromName}, {new Date(messages[0].timestamp).toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' })}</summary>
                {messages.map((item: {message:string, timestamp: number, fromName: string}, index:number) => 
                  (<div key={`${index}`}><span> From: {item.fromName}</span> <p>{item.message}</p></div>)
                )}
                <ChatInputComponent firebase={firebase} routeProps={{ targetUserID: targetUserID(), existingChatID }} />
              {/* <Link to={ROUTES.CHAT} state={{ targetUserID: targetUserID(), existingChatID: existingChatID }}>Go to chat</Link> */}
            </details>
          );
        }
      )}
    </div>
  );
};

export default ChatsListComponent;
