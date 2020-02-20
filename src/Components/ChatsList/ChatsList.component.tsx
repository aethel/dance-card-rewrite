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
import  './ChatsList.component.css'

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
  }, [user]);
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
          const targetUserID = () =>
            item.data().members.find((id: string) => id !== user.uid);
          return (
            <div className='chatBox' key={`${index}${targetID}`}>
                {messages.map((item: {message:string, timestamp: number}, index:number) => 
                  (<p key={`${index}`}>{item.message}</p>)
                )}
              <ChatInputComponent firebase={firebase} targetID={targetUserID()} />
              <Link to={""}>Go to chat with {item.id}</Link>
            </div>
          );
        }
      )}
    </div>
  );
};

export default ChatsListComponent;
