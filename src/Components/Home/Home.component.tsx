import React, { Fragment, FunctionComponent } from 'react'
import { useUser } from '../../Contexts/user.context'
import { LeafletMap } from '../Map/Map.component';


export const HomeComponent: FunctionComponent<any> = () => {
    const { user, user:{uid} } = useUser();
console.log(uid);

    return (
        <Fragment>
            <div>home comp</div>
            <LeafletMap/>
        </Fragment>
    )
}