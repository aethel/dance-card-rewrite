import React, { Fragment, FunctionComponent} from 'react'
import { LeafletMap } from '../Map/Map.component';
import { useGeo } from '../../Contexts/geolocation.context';
import { useProfile } from '../../Contexts/profile.context';


export const HomeComponent: FunctionComponent<any> = () => {
    const { location } = useGeo();
    const {profile} = useProfile()
    console.log(profile);
    
    return (
        <Fragment>
            <div>home comp</div>
            <LeafletMap centre={location}/>  
        </Fragment>
    )
}