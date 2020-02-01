import React from 'react'
import { RouteComponentProps } from '@reach/router';
import { UserProvider } from '../Contexts/user.context';
import { HomeComponent } from '../Components/Home/Home.component';
import HeaderComponent from '../Components/Header/Header.component';


const HomePage = (_: RouteComponentProps) => {
    return (
        <UserProvider>
            <HeaderComponent/>
            <HomeComponent />
        </UserProvider>
    )
}

export default HomePage;