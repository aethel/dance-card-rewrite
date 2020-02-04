import React from 'react'
import { RouteComponentProps } from '@reach/router';
import { UserProvider } from '../Contexts/user.context';
import { HomeComponent } from '../Components/Home/Home.component';
import HeaderComponent from '../Components/Header/Header.component';
import { GeolocationProvider } from '../Contexts/geolocation.context';


const HomePage = (_: RouteComponentProps) => {
    return (
        <UserProvider>
            <GeolocationProvider>
                <HeaderComponent />
                <HomeComponent />
            </GeolocationProvider>
        </UserProvider>
    )
}

export default HomePage;