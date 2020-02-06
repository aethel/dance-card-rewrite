import React, { FunctionComponent } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import ProfileDanceItemComponent from './Profile.danceItem.component'
import dances, { DancePosition } from '../../Constants/dances'

type ProfileData = {
    username: string,
    email: string,
    active: boolean,
    // [key:string]: any
}

const ProfileFormComponent: FunctionComponent = () => {
    const { control, register, handleSubmit, errors, watch } = useForm({
        defaultValues: {
            username: 'default name',
            email: 'defaultEmail@fe.fe',
            active: true
        }
    })
    const { fields } = useFieldArray({
        control,
        name: 'dances'
    });

    const onSubmit = (data: any) => {

        console.log(data);
    }


    return (
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
    )
}

export default ProfileFormComponent;