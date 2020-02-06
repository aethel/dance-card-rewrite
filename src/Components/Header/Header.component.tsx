import React, { FunctionComponent, Fragment } from 'react'
import Firebase, { FirebaseContext } from '../../Firebase/firebase'
import { navigate } from '@reach/router'
import * as ROUTES from '../../Constants/routes'
import { useUser } from '../../Contexts/user.context'
import NavigationComponent from './Navigation.component'

const HeaderComponent: FunctionComponent = () => {
    const { clearUser } = useUser();
    return (
        <FirebaseContext.Consumer>{
            (firebase: Firebase) => {
                return <Fragment>
                    <NavigationComponent firebase={firebase}/>
            
                </Fragment>

            }
        }
        </FirebaseContext.Consumer>
    )
}

export default HeaderComponent;