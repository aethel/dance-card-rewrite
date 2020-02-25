import React, {
  FunctionComponent,
  useState,
  FormEvent,
  useEffect,
  Fragment
} from "react";
import Firebase from "../../Firebase/firebase";
import { useUser } from "../../Contexts/user.context";
import ChatInputComponent from "../ChatInput/ChatInput.component";
import { useMsgNotification } from "../../Contexts/messageNotification.context";

type Props = {
  firebase: Firebase;
  routeProps?: any;
};

const SingleChatComponent: FunctionComponent<Props> = ({...props}) => {
  // QueryDocumentSnapshot
  const   {firebase } = props;
  const   {targetChatID} = props.routeProps;
  const [state, setState] = useState<[]>();
  const { user } = useUser();
  const { msg } = useMsgNotification();
console.log(targetChatID);

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
            <details className='chatBox' key={`${index}${targetChatID}`}>
              <summary>{messages[0].fromName}, {new Date(messages[0].timestamp).toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' })}</summary>
                {messages.map((item: {message:string, timestamp: number, fromName: string}, index:number) => 
                  (<div key={`${index}`}><span> From: {item.fromName}</span> <p>{item.message}</p></div>)
                )}
                <ChatInputComponent firebase={firebase} routeProps={{ targetUserID: targetUserID(), existingChatID }} />
            
            </details>
          );
        }
      )}
    </div>
  );
};

export default SingleChatComponent;
