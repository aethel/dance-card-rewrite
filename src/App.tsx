import React from 'react';
import './App.css';
import Firebase, { FirebaseContext } from './Firebase/firebase';
import { SignUpPage } from './Pages/Signup';
import { LoginPage } from './Pages/Login';
import * as ROUTES from './Constants/routes'
import { Router } from '@reach/router';
import { LandingPage } from './Pages/Landing';
function App() {
  return (
      <Router>
         <LandingPage path='/'/>
        <LoginPage path={ROUTES.LOG_IN} /> 
        <SignUpPage path={ROUTES.LOG_IN} /> 
      </Router>
  );

}

export default App;
