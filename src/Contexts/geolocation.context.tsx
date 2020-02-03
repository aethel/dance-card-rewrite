import React, { createContext, useState, useEffect, useContext } from 'react'

type Location = {
    latitude: number
    longitude: number
}

type GeolocationConsumer = {
    location: Location
    locationError: string
}

type Props = {
    children: React.ReactNode
}

const GeolocationContext = createContext<GeolocationConsumer>({} as GeolocationConsumer);

export const GeolocationProvider = ({ ...props }: Props) => {
    const [location, setLocation] = useState<Location>({} as Location);
    const [locationError, setLocationError] = useState<string>('');
    let mounted = true;

    const onChange = ({ coords }: any) => {
        if (mounted) {
            console.log(coords);
            setLocation({
                latitude: coords.latitude,
                longitude: coords.longitude,
            });
            console.log(location);
        }
    };

    const onError = (error: any) => {
        setLocationError(error.message);
    };

    useEffect(() => {
        let watchId: any = undefined;
        navigator.geolocation.getCurrentPosition(onChange, onError);
        watchId = navigator.geolocation.watchPosition(onChange, onError);

        return () => {
            mounted = false;
            navigator.geolocation.clearWatch(watchId)
        }
    }, [])

    return <GeolocationContext.Provider value={{ location, locationError }} {...props} />
}

const { Consumer: GeolocationConsumer } = GeolocationContext;

export const useGeo = () => {
    const context = useContext(GeolocationContext)
    if (context === undefined) {
        throw new Error('use with GeolocationProvider')
    }
    return context
}