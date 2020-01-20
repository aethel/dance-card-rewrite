import React from 'react'
import { RouteComponentProps } from '@reach/router'
import Firebase, { FirebaseContext } from '../Firebase/firebase'
import SignUpComponent from '../Components/SignUp/Signup.component'


export const SignUpPage = (_: RouteComponentProps) => {
    return (
        <FirebaseContext.Consumer>{
            (firebase: Firebase) => {
                return <SignUpComponent firebase={firebase} />
            }
        }
        </FirebaseContext.Consumer>
    )
}