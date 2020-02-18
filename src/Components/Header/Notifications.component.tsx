import React, { FunctionComponent, Fragment } from 'react'
import Firebase, { FirebaseContext } from '../../Firebase/firebase'
import { navigate } from '@reach/router'
import * as ROUTES from '../../Constants/routes'
import { useMsgNotification } from '../../Contexts/messageNotification.context'
import { isObjectWithValue } from '../../Utils/object'


const NotificationComponent: FunctionComponent = () => {
    const { msg } = useMsgNotification();
    const lastMessage = msg?.exists ?  msg?.data().messages[msg?.data().messages.length-1].message : undefined;
    console.log(lastMessage);
    // msg.ref
    return (
        <Fragment>
            {lastMessage && <p>Latest message: {lastMessage}</p>}
        </Fragment>
    )
}

export default NotificationComponent;