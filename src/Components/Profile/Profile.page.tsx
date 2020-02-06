import React, { FunctionComponent } from 'react'
import Firebase from '../../Firebase/firebase'
import ProfileFormComponent from './Profile.form.component'

type Props = {
    firebase: Firebase
}

const Profile: FunctionComponent<Props> = ({ firebase }: Props) => {
    return <div>
        <ProfileFormComponent/>
    </div>
}

export default Profile;