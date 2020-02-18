import React, { FunctionComponent, Fragment } from 'react'
import Firebase, { FirebaseContext } from '../../Firebase/firebase'
import { navigate } from '@reach/router'
import * as ROUTES from '../../Constants/routes'
import { useUser } from '../../Contexts/user.context'
import NavigationComponent from './Navigation.component'
import NotificationComponent from './Notifications.component'

type Props = {
    firebase: Firebase
}

const HeaderComponent: FunctionComponent<Props> = ({firebase}:Props) => {
    return (
        <Fragment>
            <NotificationComponent/>
            <NavigationComponent firebase={firebase}/>
        </Fragment>

    )
}

export default HeaderComponent;