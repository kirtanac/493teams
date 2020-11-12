import logo from './logo.svg';
import './App.css';
import firebase from "./firebase";
import CreateTeam from "./createTeam";
import ViewTeam from "./viewTeam";
import AdminSearch from "./adminSearch";
import TeamInvites from "./teamInvitations";
import AdminHome from "./adminHome";
import Home from "./LogIn";
import React from 'react';
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

//central app file that posesses all the routes

class App extends React.Component {


 render(){
  return (
    <div className="App">
      <Switch>s

        <Route path="/create-team">
          <CreateTeam />
        </Route>
        <Route path="/team-invites">
          <TeamInvites />
        </Route>
        <Route path="/admin-search">
          <AdminSearch />
        </Route>
        <Route path="/admin-home">
          <AdminHome />
        </Route>
        <Route path="/view-team">
          <ViewTeam />
        </Route>

        <Route path="/">
        <Home />
        </Route>

      </Switch>
    </div>
  ); }
}

export default App;
