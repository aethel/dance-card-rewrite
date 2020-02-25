import React, { FunctionComponent, Fragment } from "react";
import { useMsgNotification } from "../../Contexts/messageNotification.context";
import { Link } from "@reach/router";
import * as ROUTES from "../../Constants/routes";

const NotificationComponent: FunctionComponent = () => {
  const { msg } = useMsgNotification();
  debugger;
  const lastMessage = msg?.exists
    ? msg?.data().messages[msg?.data().messages.length - 1].message
    : undefined;
  return (
    <Fragment>
      {lastMessage && (
        <Fragment>
          <p>Latest message: {lastMessage}</p>
          <Link to={ROUTES.SINGLE_CHAT} state={{ targetChatID: msg.id }}>
            Go to chat
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

export default NotificationComponent;
