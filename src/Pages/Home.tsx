import React from 'react'
import { RouteComponentProps } from '@reach/router';
import { UserProvider } from '../Contexts/user.context';
import { HomeComponent } from '../Components/Home/Home.component';


const HomePage = (_: RouteComponentProps) => {
    return (
<UserProvider>
    <HomeComponent/>
</UserProvider>        
    )
}

export default HomePage;