import React, { FunctionComponent, Fragment } from 'react'
import Firebase from '../../Firebase/firebase'
import { navigate, Link } from '@reach/router'
import * as ROUTES from '../../Constants/routes'
import { useUser } from '../../Contexts/user.context'
import './Navigation.component.css'
type Props = {
    firebase: Firebase
}

const NavigationComponent: FunctionComponent<Props> = ({ firebase }: Props) => {
    const { clearUser } = useUser();
    const isLoggedIn = firebase.getCurrentUser();
    return (
        <nav>
        {/* {isLoggedIn ?
            <Fragment>  */}
            <Link className='navigationItem' to={ROUTES.HOME}>Home</Link>
            <Link className='navigationItem' to={ROUTES.PROFILE}>Profile</Link>
            <Link className='navigationItem' to={ROUTES.CHATS}>Chats</Link>
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