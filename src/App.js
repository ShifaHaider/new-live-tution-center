import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link, Redirect} from "react-router-dom";
import Main from './routes/Main/main';
import Register from './routes/Register/register';
import Login from './routes/Login/login';

var userID = localStorage.getItem('userID');


class App extends Component {
    render() {
        return (
            <div className="App">
                <Router>
                    <div>
                        <Route path="/" exact component={Login}/>
                        <Route path="/register" exact render={() => (userID ? <Redirect to='/main'/> : <Register/>)}/>
                        <Route path="/login" exact render={() => (userID ? <Redirect to='/main'/> : <Login/>)}/>
                        <Route path="/main" exact render={() => (!userID ? <Redirect to='/login'/> : <Main/>)}/>
                    </div>
                </Router>
            </div>
        );
    }
}

export default App;
