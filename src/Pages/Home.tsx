import React, { FunctionComponent } from 'react'
// import { useFirebase } from '../Firebase/firebase'
import Firebase from '../Firebase/firebase';
import { LeafletMap } from '../Components/Map/Map.component';

type Props = {
    logoutHandler: () => void
}

const Home: FunctionComponent<Props> = (props:any) => {
//  const {firebase} = useFirebase()
console.log(props);
    // const loginHandler = () => {firebase.doSignOut().then((res:any) => {debugger; 
    //     console.log(res)});
    //  }
    return (
        
        <div>home
            <button onClick={()=>props.logoutHandler()}>log out</button>
            <LeafletMap/>
        </div>
    )
}

export default Home;