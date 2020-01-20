import React, { Fragment, FunctionComponent } from 'react'
import Firebase from '../../Firebase/firebase';
import * as ROUTES from '../../Constants/routes'
import { useForm, OnSubmit } from 'react-hook-form'
import { navigate } from '@reach/router';

type Props = {
    firebase: Firebase
}

export const SignUpComponent: FunctionComponent<Props> = ({ firebase }: Props) => {
    const { register, handleSubmit, watch, errors } = useForm()

    const submitHandler: OnSubmit<any> = (data): void => {
        const {email, password} = data;
        firebase.doEmailRegistration(email, password).then((res:any) => {
            if(res) {navigate(ROUTES.LOG_IN) }
        }).catch((error: any) => { console.log(error) })
    }

    return (
        <Fragment>
            <form onSubmit={handleSubmit(submitHandler)}>
                <input required name='email' type='email' placeholder='email' ref={register({ required: true })} />
                <input required name='password' type='password' placeholder='password' ref={register({ required: true })} />
                {errors.email && <span>email is required</span>}
                <button type='submit'>Register</button>
            </form>
        </Fragment>
    )
}

export default SignUpComponent;