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
    const [radius, setRadius] = useState<number>(2);

    const fetchLocalUsers = (place: LatLngLiteral, radius:number) => {
        const geoPoint = place && firebase.getGeoPoint(place.lat, place.lng);
        const query: GeoQuery = firebase.getUsers().near({ center: geoPoint, radius });
        query.onSnapshot((res: GeoQuerySnapshot) => {
            const usersWithoutCurrentUser = res.docs.filter(u => u.id !== user.uid);
            setLocalUsers(usersWithoutCurrentUser);
        });
    }

    const radiusSliderHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setRadius(+e.target.value);
    }

    useEffect(() => {
        if (!!Object.keys(location).length) {
            // setLocalUsers([]);
            fetchLocalUsers(location, radius);
        }
    }, [location, radius])


    return (
        <Fragment>
            <span>Search radius: {radius}km</span>
            <div>home comp</div>
            <input type='range' name="radius" defaultValue={radius} min='1' step='1' max='20' onChange={radiusSliderHandler} />
            <LeafletMap radius={radius} centre={location} markers={localUsers} />
        </Fragment>
    )
}