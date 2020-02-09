import React, { FunctionComponent, Fragment } from 'react'
import { useForm } from 'react-hook-form'
import Dances, { Dance } from '../../Constants/dances'
import { useUser } from '../../Contexts/user.context'
import Firebase from '../../Firebase/firebase'
import { Profile } from '../../Models/profile.models'
import { useProfile } from '../../Contexts/profile.context'

type Props = {
    firebase: Firebase
}
const ProfileFormComponent: FunctionComponent<Props> = ({ firebase }) => {
    const { user } = useUser();
    const { profile, setProfile } = useProfile();
    const { register, handleSubmit, errors, formState } = useForm<Profile>();
    
    const onSubmit = (data: Profile) => {
        if (!Object.keys(errors).length) {
            firebase.getUsers().doc(user.uid).set(data, { merge: true }).then(docRef => {
                    setProfile(data);
                }, error => console.log(error))
            }
        }
        
        return (
            <Fragment>
            <form onSubmit={handleSubmit(onSubmit)}>
                <legend>
                    Profile
            </legend>
                <ul>
                    <li>
                        <input type="text" defaultValue={profile.username} placeholder='username' name="username" ref={register} />
                    </li>
                    <li>
                        <input type="email" defaultValue={profile.email} placeholder='email' name="email" ref={register} />
                    </li>
                    <li>
                        <label>
                            Active
          <input type="checkbox" defaultChecked={profile.active} ref={register} name='active' />
                        </label>
                    </li>
                    {!!Object.keys(profile).length && Object.entries(profile.dances).map((dance: any, index: number) => {      
                        const danceName:string = dance[0];
                        const positionsObj:any = dance[1];
                        return (
                                <li key={index}>
                                    {danceName}
                                    <label>
                                        Lead
                                    <input type="checkbox" ref={register} defaultChecked={positionsObj.lead} name={`dances.${danceName}.lead`} />
                                    </label>
                                    <label>
                                        Follow
                                    <input type="checkbox" ref={register} defaultChecked={positionsObj.follow} name={`dances.${danceName}.follow`} />
                                    </label>
                            </li>
                        )
                    })}
                    }
                </ul>
                <button type="submit">Update</button>
            </form>:
            {errors && console.log(errors)}
            }
        </Fragment>
    )
}

export default ProfileFormComponent;