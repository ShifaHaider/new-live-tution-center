import React, {Component} from 'react';
import {connect} from 'react-redux'
import {classAction} from "../../store/action/action";
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';


class ViewClass extends Component {

    constructor(props) {
        super(props);
        this.state = {
            classID: this.props.match.params.id,
            classDetail: {}
        };
        console.log(this.props.match.params.id);
        this.loadDetailClass();
        
    }

    getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    joinClass() {
        var userID = this.getCookie('userID');
        var studentsID = this.props.name.data.studentsID;
        var studentData = {studentID: userID};
        studentsID.push(studentData);
        const url = 'http://localhost:9000/update-class';
        fetch(url, {
            method: "post",
            body: JSON.stringify({_id: this.props.name.data._id, studentsID: studentsID}),
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        }).then((data) => {
            data.json().then((a) => {});
        })
            .catch((err) => {
                console.log(err);
            });
    }

    loadDetailClass(){
        const url = 'http://localhost:9000/view-class';
        fetch(url, {
            method: "post",
            body: JSON.stringify({classID: this.state.classID}),
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        }).then((data) => {
            data.json().then((a) => {
                console.log(a);
                this.setState({classDetail: a});
            });
        })
            .catch((err) => {
                console.log(err);
            });
    }

    startClass(){
        this.props.history.push('/main/start-class/' + this.state.classDetail._id);
    }
    render() {
        return (
            <div>
                <AppBar position="static">
                    <Toolbar><Typography variant="title" color="inherit">View_Class</Typography></Toolbar>
                </AppBar>
                <Card style={{ width: "500px", margin: "10px"}}>
                    <CardContent>
                        Title : {this.state.classDetail.title}
                    </CardContent>
                    <CardContent>
                        Subject : {this.state.classDetail.subject}
                    </CardContent>
                    <CardContent>
                        Fee : {this.state.classDetail.fee}
                    </CardContent>
                    <CardContent>
                        Description : {this.state.classDetail.description}
                    </CardContent>
                </Card>
                <Button variant="contained" color="primary" onClick={this.joinClass.bind(this)}>Join Class</Button>
                <br/><br/>
                <Button variant="contained" color="primary" onClick={this.startClass.bind(this)}
                        disabled={this.state.condition}>Start Class</Button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return ({
        name: state.root,
    })
};
const mapDispatchToProps = (dispatch) => {
    return ({
        action_Types: (user) => {
            dispatch(classAction(user))
        }
    })
};
export default connect(mapStateToProps, mapDispatchToProps)(ViewClass);