import React from 'react'
import { LoginComponent } from '../Components/Login/Login.component'
import { RouteComponentProps } from '@reach/router'
import Firebase, { FirebaseContext } from '../Firebase/firebase'
import { UserProvider } from '../Contexts/user.context'


export const LoginPage = (_: RouteComponentProps) => {
    return (
        <FirebaseContext.Consumer>{
            (firebase: Firebase) => {
                return <UserProvider>
                    <LoginComponent firebase={firebase} />
                </UserProvider>
            }
        }
        </FirebaseContext.Consumer>
    )
}