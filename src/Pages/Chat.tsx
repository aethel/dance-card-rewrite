import React from 'react'
import { RouteComponentProps } from '@reach/router'
import Firebase, { FirebaseContext } from '../Firebase/firebase'
import ChatComponent from '../Components/ChatInput/ChatInput.component'
import { UserProvider } from '../Contexts/user.context'
import { ProfileProvider } from '../Contexts/profile.context'
import ChatInputComponent from '../Components/ChatInput/ChatInput.component'


export const ChatPage = ({location}:RouteComponentProps ) => {
    return (
            <FirebaseContext.Consumer>{
                (firebase: Firebase) => {
                    return <UserProvider>
                        <ProfileProvider>

                        <ChatInputComponent firebase={firebase} targetID={location!.state} />
                        </ProfileProvider>
                    </UserProvider>
                }
            }
            </FirebaseContext.Consumer>
    )
}