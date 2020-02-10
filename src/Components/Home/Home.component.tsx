import React, { Fragment, FunctionComponent, useEffect, useState } from 'react'
import { LeafletMap } from '../Map/Map.component';
import { useGeo } from '../../Contexts/geolocation.context';
import Firebase from '../../Firebase/firebase';
import { GeoQuery, GeoQuerySnapshot } from 'geofirestore';
import { GeoFirestoreTypes } from 'geofirestore/dist/GeoFirestoreTypes'
import { LatLngLiteral } from 'leaflet';
type Props = {
    firebase: Firebase
}

export const HomeComponent: FunctionComponent<any> = ({ firebase }: Props) => {

    const { location } = useGeo();
    const [localUsers, setLocalUsers] = useState<GeoFirestoreTypes.QueryDocumentSnapshot[]>([])

    const fetchLocalUsers = (place: LatLngLiteral, radius: number = 1000) => {
        const geoPoint = place && firebase.getGeoPoint(place.lat, place.lng);
        const query: GeoQuery = firebase.getUsers().near({ center: geoPoint, radius: radius });
        query.get().then((res: GeoQuerySnapshot) => {
            setLocalUsers(res.docs);
        }).catch(error => console.log(error));
    }

    useEffect(() => {
        if (!!Object.keys(location).length && !localUsers.length) {
            fetchLocalUsers(location);
        }
    }, [location])


    return (
        <Fragment>
            <div>home comp</div>
            <LeafletMap centre={location} markers={localUsers} />
        </Fragment>
    )
}