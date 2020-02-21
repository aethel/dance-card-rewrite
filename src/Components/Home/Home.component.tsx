import React, { Fragment, FunctionComponent, useEffect, useState, FormEvent, ChangeEvent } from 'react'
import { LeafletMap } from '../Map/Map.component';
import { useGeo } from '../../Contexts/geolocation.context';
import Firebase from '../../Firebase/firebase';
import { GeoQuery, GeoQuerySnapshot } from 'geofirestore';
import { GeoFirestoreTypes } from 'geofirestore/dist/GeoFirestoreTypes'
import { LatLngLiteral } from 'leaflet';
import { useUser } from '../../Contexts/user.context';

type Props = {
    firebase: Firebase
}

export const HomeComponent: FunctionComponent<any> = ({ firebase }: Props) => {

    const { location } = useGeo();
    const { user } = useUser();
    const [localUsers, setLocalUsers] = useState<GeoFirestoreTypes.QueryDocumentSnapshot[]>([])
    const [radius, setRadius] = useState<number>(1000);

    const fetchLocalUsers = (place: LatLngLiteral, radius:number) => {
        const geoPoint = place && firebase.getGeoPoint(place.lat, place.lng);
        const query: GeoQuery = firebase.getUsers().near({ center: geoPoint, radius });
        query.get().then((res: GeoQuerySnapshot) => {
            const usersWithoutCurrentUser = res.docs.filter(u => u.id !== user.uid);
            setLocalUsers(usersWithoutCurrentUser);
        }).catch(error => console.log(error));
    }

    const radiusSliderHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setRadius(+e.target.value);
    }

    useEffect(() => {
        if (!!Object.keys(location).length && !localUsers.length) {
            fetchLocalUsers(location, radius);
        }
    }, [location, radius])


    return (
        <Fragment>
            {radius}
            <div>home comp</div>
            <input type='range' name="radius" defaultValue={radius} min='2' max='100000' onChange={radiusSliderHandler} />
            <LeafletMap radius={radius} centre={location} markers={localUsers} />
        </Fragment>
    )
}