import React, { Fragment, FunctionComponent} from 'react'
import { LeafletMap } from '../Map/Map.component';
import { useGeo } from '../../Contexts/geolocation.context';


export const HomeComponent: FunctionComponent<any> = () => {
    const { location } = useGeo();

    return (
        <Fragment>
            <div>home comp</div>
            <LeafletMap centre={location}/>  
        </Fragment>
    )
}