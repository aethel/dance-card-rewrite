import React from 'react'
import { RouteComponentProps } from '@reach/router'
import Firebase, { FirebaseContext } from '../Firebase/firebase'
import ChatComponent from '../Components/Chat/Chat.component'


export const ChatPage = ({location}:RouteComponentProps ) => {
    return (
            <FirebaseContext.Consumer>{
                (firebase: Firebase) => {
                    return <ChatComponent firebase={firebase} targetID={location!.state} />
                }
            }
            </FirebaseContext.Consumer>
    )
}