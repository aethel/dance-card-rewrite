import React, { Fragment, FunctionComponent, useState, useEffect } from 'react'
import { LoginComponent } from '../Login/Login.component'
import * as ROUTES from '../../Constants/routes'
import { SignUpComponent } from '../SignUp/Signup.component'
import Firebase from '../../Firebase/firebase'
import { RouteComponentProps, navigate, Router } from '@reach/router'
import { useUser } from '../../Contexts/user.context'
import Home from '../../Pages/Home'
import { LandingPage } from '../../Pages/Landing'
import { LoginPage } from '../../Pages/Login'
import { SignUpPage } from '../../Pages/Signup'
import HomePage from '../../Pages/Home'
import { ProfilePage } from '../../Pages/Profile'
import { useAuth } from '../../Contexts/auth.context'

type Props = {
    firebase: Firebase
}

export const LandingComponent: FunctionComponent<Props> = ({firebase}: Props & RouteComponentProps) => {
    const {auth} = useAuth(); 

    console.log(auth, 'METH');



    useEffect(() => {
        auth.user ? navigate(ROUTES.HOME) : navigate(ROUTES.LOG_IN)
        // https://dev.to/bmcmahen/using-firebase-with-react-hooks-21ap
        // https://usehooks.com/useAuth/
        // https://stackoverflow.com/questions/55366320/how-do-i-use-the-firebase-onauthstatechange-with-the-new-react-hooks
    }, [])

    return (<Fragment>

                    
    </Fragment>
    )
}