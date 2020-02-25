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

type Props = {
  firebase: Firebase;
  routeProps?: any;
};

const SingleChatComponent: FunctionComponent<Props> = ({ ...props }) => {
  // QueryDocumentSnapshot
  const { firebase } = props;
  const { targetChatID } = props.routeProps;
  const [state, setState] = useState<any>();
  const { user } = useUser();
  const existingChatID: string = state?.id || 'abc';
  const targetUserID = () =>
    state?.data().members.find((id: string) => id !== user.uid);

  useEffect(() => {
    const unsubscribe: any = firebase!
      .getChats()
      .doc(targetChatID)
      .onSnapshot((res: any) => {
          setState(res);
      });
    return () => unsubscribe();
  }, []);

  return (
    <div>
      {!state?.length && <p>no chat</p>}
      {state?.data().messages.map(
        (item: any, index: number) => {
          return (
            // <details className="chatBox" key={`${index}${targetChatID}`}>
            //   <summary>
            //     {item[0].fromName},{" "}
            //     {new Date(item[0].timestamp).toLocaleDateString("en-GB", {
            //       weekday: "long",
            //       year: "numeric",
            //       month: "long",
            //       day: "numeric",
            //       hour: "numeric",
            //       minute: "numeric"
            //     })}
            //   </summary>
            //        <div>
            //         <span> From: {item.fromName}</span> <p>{item.message}</p>
            //       </div>
         
            //   <ChatInputComponent
            //     firebase={firebase}
            //     routeProps={{ targetUserID: targetUserID(), existingChatID }}
            //   />
            // </details>
            <div key={`${index}${targetChatID}`}>
                < span> From: {item.fromName}</span> <p>{item.message}</p>
         
            </div>
          );
        }
        )}
        <ChatInputComponent
          firebase={firebase}
          routeProps={{ targetUserID: targetUserID(), existingChatID }}
        />
    </div>
  );
};

export default SingleChatComponent;
