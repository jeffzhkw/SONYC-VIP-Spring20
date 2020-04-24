import React, { Component, useState } from "react";
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Login from './Pages/LoginPage';
import Audio from './Pages/Audio';
import SignUp from './Pages/SignUp';
import HomePage from './Pages/HomePage';
import DashBoard from './Pages/DashBoard'
import {auth} from './service/firebase';
const App = () => {
    const [authenticated, setAuthenticated] = useState(false)
    auth().onAuthStateChanged((user) => {
      if(user) {
        setAuthenticated(true)
      } else {
        setAuthenticated(false)
      }
    })

    return (
      <div className="app">
        <Router>
         <Switch>
           <Route exact path = "/" component = {HomePage} />
           <PrivateRoute path = "/dashboard" authentication = {authenticated} component = {DashBoard} />
           <PrivateRoute path = "/audio" authentication = {authenticated} component = {Audio} />
           <Route path = "/signup" authentication = {authenticated} component = {SignUp} />
           <Route path = "/login" authentication = {authenticated} component = {Login} />
         </Switch>
        </Router>
      </div>
    );
}

//figure out how to work with this
const PrivateRoute = (props) => {
  if(props.authentication == false) {
    return <Route component = {Login} />
  }
  return <Route component={props.component} />;
};

export default App;
