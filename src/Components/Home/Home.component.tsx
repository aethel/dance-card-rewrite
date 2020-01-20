import React, { Fragment, FunctionComponent } from 'react'
import Firebase from '../../Firebase/firebase';
import * as ROUTES from '../../Constants/routes'
import { useForm, OnSubmit } from 'react-hook-form'
import { Link, navigate } from '@reach/router';
import { useUser } from '../../Contexts/user.context'
import { LeafletMap } from '../Map/Map.component';


export const HomeComponent: FunctionComponent<any> = () => {
    const { user } = useUser();
console.log(user);

    return (
        <Fragment>
            <div>home comp</div>
            <LeafletMap/>
        </Fragment>
    )
}