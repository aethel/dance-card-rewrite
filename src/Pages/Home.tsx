import React, { FunctionComponent } from 'react'
// import { useFirebase } from '../Firebase/firebase'
import Firebase from '../Firebase/firebase';
import { LeafletMap } from '../Components/Map/Map.component';

const Home: FunctionComponent<any> = ({ firebase }: { firebase: Firebase}) => {
//  const {firebase} = useFirebase()
console.log(firebase);
    const loginHandler = () => {firebase.doAnonymousSignIn().then((res:any) => {debugger; 
        console.log(res)});
     }
    return (
        
        <div>home
            <button onClick={loginHandler}>log</button>
            <LeafletMap/>
        </div>
    )
}

export default Home;