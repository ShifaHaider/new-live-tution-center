
import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Dashboard from './Dashboard/dashboard'
import Classes from "../Classes/classes";
import CreateClass from "../Create_Class/create-class";
import MyClasses from "../My_Classes/my-classes";

class Main extends Component {
    render() {
        return (
            <div>
                <Router>
                    <div>
                        <h1>kfdh</h1>
                        <Route path="/dashboard" exact component={Dashboard}/>
                        <Route path="/create-class" exact component={CreateClass}/>
                        <Route path="/classes" exact component={Classes}/>
                        <Route path="/my-classes" exact component={MyClasses}/>
                    </div>
                </Router>
            </div>
        );
    }
}

export default Main;