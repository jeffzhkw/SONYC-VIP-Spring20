import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch, Link} from "react-router-dom";
import Login from './LoginPage';
import HomePage from './HomePage';
const App = () => {
    return (
      <div className="app">
        <Router>
         <Switch>
           <Route exact path = "/" component = {HomePage} />
           <Route path = "/login" component = {Login} />
         </Switch>
        </Router>
      </div>
    );
}

export default App;
