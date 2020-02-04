import React, { Fragment, FunctionComponent } from 'react'
import { useUser } from '../../Contexts/user.context'
import { LeafletMap } from '../Map/Map.component';
import { useGeo } from '../../Contexts/geolocation.context';


export const HomeComponent: FunctionComponent<any> = () => {
    const { user, user:{uid} } = useUser();
    const { location } = useGeo();
console.log(location);

    return (
        <Fragment>
            <div>home comp</div>
            <LeafletMap centre={location}/>
        </Fragment>
    )
}