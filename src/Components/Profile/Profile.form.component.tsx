import React, { FunctionComponent, Fragment } from 'react'
import { useForm } from 'react-hook-form'
import dances, { DancePosition } from '../../Constants/dances'
import { useUser } from '../../Contexts/user.context'
import Firebase from '../../Firebase/firebase'
import { ProfileData } from '../../Models/profile.models'

type Props = {
    firebase: Firebase
}
const ProfileFormComponent: FunctionComponent<Props> = ({firebase}) => {
    const {user} = useUser();
    const { register, handleSubmit, errors, formState } = useForm<ProfileData>({
        defaultValues: {
            username: 'default name',
            email: 'defaultEmail@fe.fe',
            active: true
        }
    })

    const onSubmit = (data: ProfileData) => {
        if(!Object.keys(errors).length){
            firebase.getUsers().doc(user.uid).set(data, {merge:true}).then(docRef => {
                console.log(docRef);
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
                    <input type="text" placeholder='username' name="username" ref={register} />
                </li>
                <li>
                    <input type="email" placeholder='email' name="email" ref={register} />
                </li>
                <li>
                    <label>
                        Active
          <input type="checkbox" ref={register} name='active' />
                    </label>
                </li>
                {Array.from(dances).map((dance, index:number) => {
                    const danceName: string = dance[0];
                    const dancePosition: DancePosition = dance[1];
                    return (
                        <li key={index}>
                            {danceName}
                            <label>
                                Lead
      <input type="checkbox" ref={register} defaultChecked={dancePosition.lead} name={`dances[${index}].${danceName}.lead`} />
                            </label>
                            <label>
                                Follow
      <input type="checkbox" ref={register} defaultChecked={dancePosition.lead} name={`dances[${index}].${danceName}.follow`} />
                            </label>
                        </li>
                    )
                })}
            </ul>
            <button type="submit">Update</button>
        </form>
        {errors && console.log(errors)}
        } 
        </Fragment>       
    )
}

export default ProfileFormComponent;