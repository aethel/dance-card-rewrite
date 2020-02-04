import React, { Fragment, FunctionComponent, useEffect } from 'react'
import { useUser } from '../../Contexts/user.context'
import { LeafletMap } from '../Map/Map.component';
import { useGeo } from '../../Contexts/geolocation.context';


export const HomeComponent: FunctionComponent<any> = () => {
    const { user, user:{uid} } = useUser();
    const { location } = useGeo();

    return (
        <Fragment>
            <div>home comp</div>
            <LeafletMap centre={location}/>  
        </Fragment>
    )
}