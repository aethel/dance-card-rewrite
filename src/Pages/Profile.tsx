import React from 'react'
import { RouteComponentProps } from '@reach/router'
import Firebase, { FirebaseContext } from '../Firebase/firebase'
import Profile from '../Components/Profile/Profile.page'
import { UserProvider } from '../Contexts/user.context'
import { ProfileProvider } from '../Contexts/profile.context'


export const ProfilePage = (_: RouteComponentProps) => {
    return (
            <FirebaseContext.Consumer>{
                (firebase: Firebase) => {
                    return <UserProvider>
                        <ProfileProvider>
                        <Profile firebase={firebase} />
                        </ProfileProvider>
                    </UserProvider> 
                }
            }
            </FirebaseContext.Consumer>
    )
}