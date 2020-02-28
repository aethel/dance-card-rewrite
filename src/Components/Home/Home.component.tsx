import React, { Fragment, FunctionComponent, useEffect, useState, ChangeEvent } from 'react'
import { LeafletMap } from '../Map/Map.component';
import { useGeo } from '../../Contexts/geolocation.context';
import Firebase from '../../Firebase/firebase';
import { GeoQuery, GeoQuerySnapshot } from 'geofirestore';
import { GeoFirestoreTypes } from 'geofirestore/dist/GeoFirestoreTypes'
import { LatLngLiteral } from 'leaflet';
import { useUser } from '../../Contexts/user.context';
import { useProfile } from '../../Contexts/profile.context';

type Props = {
    firebase: Firebase
}

export const HomeComponent: FunctionComponent<any> = ({ firebase }: Props) => {

    const { location, locationError } = useGeo();
    const { user } = useUser();
    const { profile } = useProfile();
    const [localUsers, setLocalUsers] = useState<GeoFirestoreTypes.QueryDocumentSnapshot[]>([])
    const [radius, setRadius] = useState<number>(2);
    const DEV_LOCATION = {lat:55.93570297055991, lng:-3.1465507938538726};
    const fetchLocalUsers = (place: LatLngLiteral, radius:number) => {
        const geoPoint = place && firebase.getGeoPoint(place.lat, place.lng);
        // const geoPoint = place && firebase.getGeoPoint(DEV_LOCATION.lat, DEV_LOCATION.lng);
        const query: GeoQuery = firebase.getUsers().near({ center: geoPoint, radius });
        query.onSnapshot((res: GeoQuerySnapshot) => {
            const usersWithoutCurrentUser = res.docs.filter(u => u.id !== user.uid).filter(user => 
                user.data().active
             );
             
            setLocalUsers(usersWithoutCurrentUser);
        });
    }

    const radiusSliderHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setRadius(+e.target.value);
    }

    useEffect(() => {
        if (!!Object.keys(location).length) {
            fetchLocalUsers(location, radius);
        }
    }, [location, radius, locationError])


    return (
        <div className='container'>
            <span>Search radius: {radius}km</span>
            <input type='range' name="radius" defaultValue={radius} min='1' step='1' max='20' onChange={radiusSliderHandler} />
            {locationError && <p>{locationError.message}</p>}
            <LeafletMap radius={radius} centre={location} markers={localUsers} />
            {/* <LeafletMap radius={radius} centre={DEV_LOCATION} markers={localUsers} /> */}
        </div>
    )
}