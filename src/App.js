import React, {Component} from 'react';
import firebase from 'firebase'
import {BrowserRouter as Router, Route, Link, Redirect} from "react-router-dom";
import Main from './routes/Main/main';
import Register from './routes/Register/register';
import Login from './routes/Login/login';
import Dashboard from "./routes/Main/Dashboard/dashboard";
import CreateClass from "./routes/Create_Class/create-class";
import Classes from "./routes/Classes/classes";
import MyClasses from "./routes/My_Classes/my-classes";

var userID = localStorage.getItem('userID');
var config = {
    apiKey: "AIzaSyDFXUDwwIITkocKHqCMGDdmbKMxZ0kPo0g",
    authDomain: "react-component-4988c.firebaseapp.com",
    databaseURL: "https://react-component-4988c.firebaseio.com",
    projectId: "react-component-4988c",
    storageBucket: "react-component-4988c.appspot.com",
    messagingSenderId: "303737650593"
};
firebase.initializeApp(config);
class App extends Component {
    render() {
        return (
            <div className="App">
                <Router>
                    <div>
                        <Route path="/" exact component={Login}/>
                        <Route path="/c" exact component={CreateClass}/>
                        <Route path="/classes" exact component={Classes}/>
                        <Route path="/main"  component={Main}/>
                        <Route path="/my" exact component={MyClasses}/>
                        <Route path="/register" exact render={() => (userID ? <Redirect to='/main'/> : <Register/>)}/>
                        <Route path="/login" exact render={() => (userID ? <Redirect to='/main'/> : <Login/>)}/>
                        {/*<Route path="/main" exact render={() => (!userID ? <Redirect to='/login'/> : <Main/>)}/>*/}
                    </div>
                </Router>
            </div>
        );
    }
}

export default App;
