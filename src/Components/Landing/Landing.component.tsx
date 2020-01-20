import React, { Fragment, FunctionComponent, useState, useEffect } from 'react'
import { LoginComponent } from '../Login/Login.component'
import * as ROUTES from '../../Constants/routes'
import { SignUpComponent } from '../SignUp/Signup.component'
import Firebase from '../../Firebase/firebase'
import { RouteComponentProps, navigate } from '@reach/router'
import { useUser } from '../../Contexts/user.context'
import Home from '../../Pages/Home'

type Props = {
    firebase: Firebase
}

export const LandingComponent: FunctionComponent<Props> = ({firebase}: Props & RouteComponentProps) => {
    const { user, setUser, getUserFromStorage } = useUser()
    const [ registrationNeeded, setRegistrationNeeded ] = useState<boolean>(false) 

    console.log(user, 'METH');
    console.log(firebase, 'firebase');



    useEffect(() => {
        user ? navigate(ROUTES.HOME) : navigate(ROUTES.LOG_IN)
        
    }, [user])
    // firebase!.onAuthStateChanged((user: any) => {
    //     if(!user){
    //         localStorage.clear();
    //     } else {
    //         const {uid, email,displayName, name} = user;
    //         const oldUser = getUserFromStorage!();
    //         oldUser ? localStorage.setItem('user', JSON.stringify({ ...oldUser, uid, email, displayName, name })) : localStorage.setItem('user', JSON.stringify(Object.assign({},{ uid, email, displayName, name}))) 
    //     }
    //     console.log(user, 'authChange')
        
    // })
    

     

    // const logoutHandler = ():void => {
    //     firebase!.doSignOut().then((res: any) => {
    //         debugger;
    //         console.log(res)
    //     });
    // }
    return (
       
         <Fragment>
            {/* <button onClick={loginHandler}>log</button> */}
                    {/* <Home logoutHandler={logoutHandler}/> */}
                                            <div>
                                                {}
                {/* <LoginComponent loginHandler={loginHandler} /> */}
                {/* {registrationNeeded && <SignUpComponent registrationHandler={registrationHandler} />} */}
                        </div>         
                </Fragment>
    )
}