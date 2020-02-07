import React, { FunctionComponent } from 'react'
import Firebase from '../../Firebase/firebase'
import ProfileFormComponent from './Profile.form.component'
import HeaderComponent from '../Header/Header.component'

type Props = {
    firebase: Firebase
}

const Profile: FunctionComponent<Props> = ({ firebase }: Props) => {
    return <div>
        <HeaderComponent firebase={firebase}/>
        <ProfileFormComponent firebase={firebase}/>
    </div>
}

export default Profile;