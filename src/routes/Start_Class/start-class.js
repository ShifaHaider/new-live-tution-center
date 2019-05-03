import React, {Component} from 'react';
import './fiSiNs.mp4'
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';

class StartClass extends Component {

    constructor(props) {
        super(props);
    }



    render() {
        return (
            <div>
                <AppBar position="static">
                    <Toolbar><Typography variant="title" color="inherit">Start_Class</Typography></Toolbar>
                </AppBar>
                <video width="320" height="240" controls>
                    <source src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4" type="video/mp4"/>
                </video>
                <br/><br/>
                  <video width="320" height="240" controls>
                    <source src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4" type="video/mp4"/>
                </video>
                <br/><br/>
                  <video width="320" height="240" controls>
                    <source src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4" type="video/mp4"/>
                </video>

            </div>
        );
    }
}

export default StartClass;