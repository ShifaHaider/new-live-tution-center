import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';

class Dashboard extends Component {
    render() {
        return (
            <div className="App">
                <AppBar position="static">
                    <Toolbar><Typography variant="title" color="inherit">Dashboard</Typography></Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default Dashboard;