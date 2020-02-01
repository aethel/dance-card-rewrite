import React, { FunctionComponent, Fragment } from 'react'
import Firebase, { FirebaseContext } from '../../Firebase/firebase'
import { navigate } from '@reach/router'
import * as ROUTES from '../../Constants/routes'
import { useUser } from '../../Contexts/user.context'

const HeaderComponent: FunctionComponent<any> = () => {
    const { clearUser } = useUser();
    return (
        <FirebaseContext.Consumer>{
            (firebase: Firebase) => {
                return <Fragment>
                    <button onClick={() => {
                        firebase.doSignOut(); 
                        clearUser();
                        navigate(ROUTES.LOG_IN)}}>logout</button>
                </Fragment>

            }
        }
        </FirebaseContext.Consumer>
    )
}

export default HeaderComponent;