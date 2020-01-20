import React, { FunctionComponent } from 'react'
// import { useFirebase } from '../Firebase/firebase'
import { LeafletMap } from '../Components/Map/Map.component';
import { RouteComponentProps } from '@reach/router';
// import { useUser } from '../../Contexts/user.context'


const HomePage = (_: RouteComponentProps) => {
//  const {firebase} = useFirebase()
    // const loginHandler = () => {firebase.doSignOut().then((res:any) => {debugger; 
    //     console.log(res)});
    //  }
    return (
        
        <div>home
            {/* <button onClick={()=>props.logoutHandler()}>log out</button> */}
            <LeafletMap/>
        </div>
    )
}

export default HomePage;