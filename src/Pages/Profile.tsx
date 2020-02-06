import React from 'react'
import { RouteComponentProps } from '@reach/router'
import Firebase, { FirebaseContext } from '../Firebase/firebase'
import Profile from '../Components/Profile/Profile.page'


export const ProfilePage = (_: RouteComponentProps) => {
    return (
            <FirebaseContext.Consumer>{
                (firebase: Firebase) => {
                    return <Profile firebase={firebase} />
                }
            }
            </FirebaseContext.Consumer>
    )
}