import logo from './logo.svg';
import './App.css';
import firebase from "./firebase";
import CreateTeam from "./pages/createTeam";
import ViewTeam from "./pages/viewTeam";
import AdminSearch from "./pages/adminSearch";
import AdminEdit from "./pages/adminEdit";
import TeamInvites from "./pages/teamInvitations";
import AdminHome from "./pages/adminHome";
import StudentSeeTeams from "./pages/studentSeeTeams";
import Home from "./pages/Home";
import Login from "./components/login"
import React from 'react';
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


//central app file that posesses all the routes

class App extends React.Component {


 render(){
  return (
    <div className="App">


      <Switch>

        <Route path="/create-team">
          <CreateTeam />
        </Route>
        <Route path="/team-invites">
          <TeamInvites />
        </Route>
        <Route path="/admin-search">
          <AdminSearch />
        </Route>
        <Route path="/admin-edit">
          <AdminEdit />
        </Route>
        <Route path="/admin-home">
          <AdminHome />
        </Route>
        <Route path="/view-team">
          <ViewTeam />
        </Route>
        <Route path="/see-teams">
          <StudentSeeTeams />
        </Route>

        <Route path="/">
        <Home />
        </Route>

      </Switch>
    </div>
  ); }
}

export default App;
