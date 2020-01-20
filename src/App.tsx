import React from 'react';
import './App.css';
import { SignUpPage } from './Pages/Signup';
import { LoginPage } from './Pages/Login';
import * as ROUTES from './Constants/routes'
import { Router } from '@reach/router';
import { LandingPage } from './Pages/Landing';
import HomePage from './Pages/Home';
function App() {
  return (
      <Router>
         <LandingPage path='/'/>
        <HomePage path={ROUTES.HOME} /> 
        <LoginPage path={ROUTES.LOG_IN} /> 
        <SignUpPage path={ROUTES.SIGN_UP} /> 
      </Router>
  );

}

export default App;
