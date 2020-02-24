import React, { FunctionComponent, Fragment } from 'react'
import { useMsgNotification } from '../../Contexts/messageNotification.context'


const NotificationComponent: FunctionComponent = () => {
    const { msg } = useMsgNotification();
    const lastMessage = msg?.exists ?  msg?.data().messages[msg?.data().messages.length-1].message : undefined;
    return (
        <Fragment>
            {lastMessage && <p>Latest message: {lastMessage}</p>}
        </Fragment>
    )
}

export default NotificationComponent;