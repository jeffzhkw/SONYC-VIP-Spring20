import React, { Component, useState } from "react";
import { BrowserRouter as Router, Route, Switch, Link, Redirect} from "react-router-dom";
import Login from './Pages/LoginPage';
import HomePage from './Pages/HomePage';
import SignUp from './Pages/SignUp'
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
           <Route path = "/signup" authentication = {authenticated} component = {SignUp} />
           <Route path = "/login" authentication = {authenticated} component = {Login} />
           {/* add private part */}
         </Switch>
        </Router>
      </div>
    );
}

const PrivateRoute = (props) => {
  return(
    <Route>
      render = {
        (props) => props.authentication === true 
        ? <Component {...props} />
        : <Redirect to= '/login'/>
      }
    </Route>
  )
}

//double check this
const PublicRoute = (props) => {
  return(
    <Route>
      render = {
        (props) => props.authentication === false 
        ? <Component {...props} />
        : <Redirect to= '/private'/>
      }
    </Route>
  )
}

export default App;
