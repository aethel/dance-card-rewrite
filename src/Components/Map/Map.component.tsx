import React from 'react'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import { LatLngLiteral } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});


export const LeafletMap = (props: any): any => {
    const defaultLocation: LatLngLiteral = {
        lat: 45.6982642,
        lng: 9.6772698,
    };
    return <Map style={{ width: '100%', height: '100vw' }} center={defaultLocation} zoom={13}>
        <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
        />
        <Marker position={defaultLocation}>
            <Popup>A pretty CSS3 popup.<br />Easily customizable.</Popup>
        </Marker>
    </Map>
}