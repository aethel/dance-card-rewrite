import React from 'react';
import './App.css';
import { Router } from '@reach/router';
import { LandingPage } from './Pages/Landing';
import { LoginPage } from './Pages/Login';
import { SignUpPage } from './Pages/Signup';
import * as ROUTES from './Constants/routes'
import HomePage from './Pages/Home';
import { useAuth } from './Contexts/auth.context';
import { ProfilePage } from './Pages/Profile';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute.component';
function App() {
  const { auth } = useAuth(); 
console.log(auth,'app');

  return (
      <Router>
         <LandingPage path='/'/>
      <LoginPage path={ROUTES.LOG_IN} />
      <SignUpPage path={ROUTES.SIGN_UP} />
      <PrivateRoute as={HomePage} path={ROUTES.HOME}/>
      <PrivateRoute as={ProfilePage} path={ROUTES.PROFILE}/>
      </Router>
  );

}

export default App;
