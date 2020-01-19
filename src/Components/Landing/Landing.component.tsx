import React, { Fragment, FunctionComponent } from 'react'
import { LoginComponent } from '../Login/Login.component'

import { SignUpComponent } from '../SignUp/Signup.component'
import Firebase from '../../Firebase/firebase'
import { RouteComponentProps } from '@reach/router'
import { useUser } from '../../Contexts/user.context'
import Home from '../../Pages/Home'

type Props = {
    firebase: Firebase
}

export const LandingComponent: FunctionComponent<Props> = ({firebase}: Props & RouteComponentProps) => {
    const { user, setUser } = useUser()
    console.log(user, 'METH');
    console.log(firebase, 'firebase');

    firebase!.onAuthStateChanged((user: any) => {
        console.log(user, 'authChange')
    })
    

    const loginHandler = ():void => 
         firebase.doAnonymousSignIn().catch((error:any) => { console.log(error) })
    

    const logoutHandler = ():void => {
        firebase!.doSignOut().then((res: any) => {
            debugger;
            console.log(res)
        });
    }
    return (
       
         <Fragment>
            <button onClick={loginHandler}>log</button>
                    <Home logoutHandler={logoutHandler}/>
                                            <div>
                            <LoginComponent />
                            <SignUpComponent />
                        </div>         
                </Fragment>
    )
}