import React, {Fragment, FunctionComponent } from 'react'
import Firebase from '../../Firebase/firebase';
import * as ROUTES from '../../Constants/routes'
import { useForm, OnSubmit } from 'react-hook-form'
import { Link, navigate } from '@reach/router';
import { useUser } from '../../Contexts/user.context'

type Props = {
    firebase: Firebase
}

export const LoginComponent:FunctionComponent<Props> = ({firebase}:Props) => {
    const {register, handleSubmit, watch,errors} = useForm()
    const {setUser} = useUser();
    
    const submitHandler: OnSubmit<any> = ({ email, password },event): void => {
        debugger
        firebase.doEmailSignIn(email, password).then((res:any)=>{
            debugger
            const {uid, email,displayName, name} = res.user.toJSON();
            localStorage.setItem('user', JSON.stringify(Object.assign({},{ uid, email, displayName, name}))) 
            setUser!({ uid, email, displayName, name })
            navigate(ROUTES.HOME)
        }).catch((error: any) => { console.log(error) })    
    } 

    return (
        <Fragment>
        <form onSubmit={handleSubmit(submitHandler)}>
                <input name='email' type="email" placeholder='email' ref={register({required: true})} />
            <input name='password' type="password" placeholder='password' ref={register({ required: true })} />
            {errors.email && <span>email is required</span>}
            <button type='submit'>log in</button>
        </form>
        <Link to={ROUTES.SIGN_UP}>No account? Register.</Link>
        </Fragment>
    )
}