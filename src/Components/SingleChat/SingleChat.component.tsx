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

  const targetUserID = (array: string[]) =>
    array.find((id: string) => id !== user.uid);

  useEffect(() => {
    const unsubscribe: any = firebase!
      .getChats()
      .doc(targetChatID)
      .onSnapshot((res: any) => {
        setState(res);
        console.log(state);
      });
    return () => unsubscribe();
  }, []);

  return (
    <div>
      {!state && <p>no chat</p>}
      {state?.data().messages.map((item: any, index: number) => {
        return (
          <div key={`${index}${targetChatID}`}>
            <span> From: {item.fromName}</span> <p>{item.message}</p>
          </div>
        );
      })}
      {state && (
        <ChatInputComponent
          firebase={firebase}
          routeProps={{
            targetUserID: targetUserID(state?.data().members),
            existingChatID: state.id
          }}
        />
      )}
    </div>
  );
};

export default SingleChatComponent;
