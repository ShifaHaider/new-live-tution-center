import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Dashboard from '../Dashboard/dashboard'
import Classes from "../Classes/classes";
import CreateClass from "../Create_Class/create-class";
import MyClasses from "../My_Classes/my-classes";
import ViewClass from '../View_Class/view-class';
import StartClass from '../Start_Class/start-class';
import MyJoinClasses from '../My_Join_Classes/my-join-classes'


class Main extends Component {
    render() {
        return (
            <div>
                <Router>
                    <div>
                        <Route path="/dashboard" exact component={Dashboard}/>
                        <Route path="/main/create-class" exact component={CreateClass}/>
                        <Route path="/main/classes" exact component={Classes}/>
                        <Route path="/main/my-classes" exact component={MyClasses}/>
                        <Route path="/main/view-class/:id" exact component={ViewClass}/>
                        <Route path="/main/my-join-classes" exact component={MyJoinClasses}/>
                        <Route path="/main/start-class/:id" exact component={StartClass}/>

                    </div>
                </Router>
            </div>
        );
    }
}

export default Main