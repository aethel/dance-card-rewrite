import React, { FunctionComponent } from 'react'
import Firebase from '../../Firebase/firebase'

type Props ={
    firebase: Firebase,
    targetID?: {[key:string]:string} | null
}

const ChatComponent: FunctionComponent<Props> = ({firebase, targetID}) => {
console.log(targetID);

    return (
        <form>
            is a chat
        </form>
    )
}

export default ChatComponent;