import React, { Fragment, FunctionComponent } from 'react'
import Firebase from '../../Firebase/firebase';
import * as ROUTES from '../../Constants/routes'
import { useForm, OnSubmit } from 'react-hook-form'
import { navigate } from '@reach/router';
import { useGeo } from '../../Contexts/geolocation.context';
import { UserDoc } from '../../Models/user.model';

type Props = {
    firebase: Firebase
}

export const SignUpComponent: FunctionComponent<Props> = ({ firebase }: Props) => {
    const { register, handleSubmit, watch, errors } = useForm();
    const { location } = useGeo()

    const getGeoPoint: (latitude: number, longitude: number) => firebase.firestore.GeoPoint = (latitude, longitude) => {
        return firebase.getGeoPoint(latitude, longitude);
    }

    const submitHandler: OnSubmit<any> = (data): void => {
        const { email, password, username } = data;
            firebase.doEmailRegistration(email, password).then((res: any) => {
                if (res) {
                    const doc: UserDoc = {
                        username: username,
                        email: res.user.email,
                        coordinates: getGeoPoint(location.lat, location.lng),
                        active: true,
                        chats: []
                    };
                    firebase.getUsers().doc(res.user.uid).set(doc).then(docRef => {
                        navigate(ROUTES.LOG_IN)
                    }, error => console.log(error))
                }
            }).catch((error: any) => { console.log(error) });
        
    }

    return (
        <Fragment>
            {location ? (<form onSubmit={handleSubmit(submitHandler)}>
                <input required name='username' type='text' placeholder='username' ref={register({ required: true })} />
                <input required name='email' type='email' placeholder='email' ref={register({ required: true })} />
                <input required name='password' type='password' placeholder='password' ref={register({ required: true })} />
                {errors.email && <span>email is required</span>}
                <button type='submit'>Register</button>
            </form>) : <span>no geolocation</span> }
            
        </Fragment>
    )
}

export default SignUpComponent;