import React, { useEffect } from 'react'
import firebase from '../Firebase/firebase'
import { LeafletMap } from '../Components/Map/map';

const Home = () => {

    useEffect(() => {
        console.log(firebase);                
    }, [])
    return (
        
        <div>home

            <LeafletMap />
        </div>
    )
}

export default Home;