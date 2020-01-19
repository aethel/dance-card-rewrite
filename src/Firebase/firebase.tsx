import React from 'react'
import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {   
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DB_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_APP,
    messagingSenderId: process.env.REACT_APP_MESSAGE_SENDER,
}

class Firebase {
   private auth: any;
    constructor() {
        app.initializeApp(firebaseConfig);
        this.auth = app.auth();
    }

    doAnonymousSignIn = () => this.auth.signInAnonymously();
    doSignOut = () => this.auth.signOut();
    onAuthStateChanged = (user:any) => this.auth.onAuthStateChanged(user);
    onEMail = (email:string, password:string) => this.auth.signInWithEmailAndPassword(email,password);
}
export default Firebase;

// export const FirebaseContext = React.createContext<Firebase|null>(null)

type FirebaseConsumer = {
    firebase:Firebase
}
type Props = {
    firebase: Firebase | undefined
}

export const FirebaseContext = React.createContext<any>(undefined);
