import React, { FunctionComponent, Fragment } from 'react'
import Firebase from '../../Firebase/firebase'
import { navigate, Link } from '@reach/router'
import * as ROUTES from '../../Constants/routes'
import { useUser } from '../../Contexts/user.context'

type Props = {
    firebase: Firebase
}

const NavigationComponent: FunctionComponent<Props> = ({ firebase }: Props) => {
    const { clearUser } = useUser();
    const isLoggedIn = firebase.getCurrentUser();
    return (
        <nav>
        {/* {isLoggedIn ?
            <Fragment>
            <Link to={ROUTES.PROFILE} /> */}
            <Link to={ROUTES.PROFILE}>Profile</Link>
                    <button onClick={() => {
                        firebase.doSignOut();
                        clearUser();
                        navigate(ROUTES.LOG_IN)
                    }}>logout</button>
            {/* </Fragment>
            :
                    <p>must log in</p>
            
            } */}
            </nav>
    )
}

export default NavigationComponent;