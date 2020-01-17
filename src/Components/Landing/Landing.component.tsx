import React, { Fragment, FunctionComponent } from 'react'
import { LoginComponent } from '../Login/Login.component'

import { SignUpComponent } from '../SignUp/Signup.component'
import Firebase, { FirebaseContext } from '../../Firebase/firebase'
import { RouteComponentProps } from '@reach/router'
import { UserProvider, useUser } from '../../Contexts/user.context'

type Props = {
    firebase?:Firebase
}

export const LandingComponent:FunctionComponent<Props> = (_: RouteComponentProps) => {
const {user} = useUser()
console.log(user);

    return (
        <FirebaseContext.Consumer>{
            (firebase: Firebase) => {
                const loginHandler = () => {
                    firebase.doAnonymousSignIn().then((res: any) => {
                        debugger;
                        console.log(res)
                    });
                }

                return <Fragment>
                    <button onClick={loginHandler}>log</button>
                    {console.log(firebase)}

                    <LoginComponent />
                    <SignUpComponent />
                </Fragment>
            }
        }
        </FirebaseContext.Consumer>
    )
}