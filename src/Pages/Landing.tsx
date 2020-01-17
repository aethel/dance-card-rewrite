import React, { Fragment, ReactNode } from 'react'
import { LoginComponent } from '../Components/Login/Login.component'
import { SignUpComponent } from '../Components/SignUp/Signup.component'
import Firebase, { FirebaseContext } from '../Firebase/firebase'
import { RouteComponentProps } from '@reach/router'

// type Props = {
//     firebase?:Firebase
// }

export const LandingPage = (_:RouteComponentProps) => {

    return (
        <FirebaseContext.Consumer>{
            (firebase: Firebase) =>
                <Fragment>
{console.log(firebase)}
                    <LoginComponent />
                    <SignUpComponent/>
                </Fragment>
        }
        </FirebaseContext.Consumer>
    )
}