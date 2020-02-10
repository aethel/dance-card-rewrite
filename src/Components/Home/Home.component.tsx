import React, { Fragment, FunctionComponent, useEffect, useState } from 'react'
import { LeafletMap } from '../Map/Map.component';
import { useGeo } from '../../Contexts/geolocation.context';
import Firebase from '../../Firebase/firebase';
import { GeoQuery, GeoQuerySnapshot } from 'geofirestore';
import { GeoFirestoreTypes } from 'geofirestore/dist/GeoFirestoreTypes'
type Props = {
    firebase: Firebase
}

export const HomeComponent: FunctionComponent<any> = ({ firebase }: Props) => {

    const { location } = useGeo();
    const [localUsers, setLocalUsers] = useState<GeoFirestoreTypes.QueryDocumentSnapshot[]>([])

    useEffect(() => {
        if (!!Object.keys(location).length && !localUsers.length) {
            const geoPoint = location && firebase.getGeoPoint(location.lat, location.lng);
            const query: GeoQuery = firebase.getUsers().near({ center: geoPoint, radius: 1000 });
            query.get().then((res: GeoQuerySnapshot) => {
                setLocalUsers(res.docs);
            }).catch(error => console.log(error));
        }
    }, [location])


    return (
        <Fragment>
            <div>home comp</div>
            <LeafletMap centre={location} markers={localUsers} />
        </Fragment>
    )
}