import React, {Component} from 'react';
import {connect} from 'react-redux';
import {classAction} from "../../store/action/action";
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

class MyClasses extends Component {

    constructor(props) {
        super(props);
        this.state = {
            myClasses: [],
        };
        this.loadMyClasses();
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

    loadMyClasses() {
        var checkID = this.getCookie('userID');
        const url = 'http://localhost:9000/classes';
        fetch(url, {
            method: "get",
        })
            .then((data) => {
                data.json().then((classes) => {
                    var myClasses = this.state.myClasses;
                    for (var i = 0; i < classes.length; i++) {
                        if (classes[i].userID === checkID) {
                            myClasses.push(classes[i])
                        }
                    }
                    this.setState({classes: myClasses});
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    viewClass(value){
        this.props.action_Types(value);
        this.props.history.push('/main/view-class/' + value._id);


    }

    render() {
        return (
            <div>
                <AppBar position="static">
                    <Toolbar><Typography variant="title" color="inherit">My_Classes</Typography></Toolbar>
                </AppBar>
                <div style={{display: "flex", flexWrap: "wrap", justifyContent: "center"}}>
                    {this.state.myClasses.map((val, ind) => {
                        return (
                            <Card key={ind} style={{
                                width: "30%", height: "140px", border: "solid 1px #bebebe",
                                borderRadius: "0px", margin: "2px", boxShadow: "none"
                            }}>
                                <CardContent>
                                    <Typography variant="h5" component="h4">
                                        {val.title}
                                    </Typography>
                                    <Typography color="textSecondary">
                                        {val.subject}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" color="primary" onClick={this.viewClass.bind(this, val)}>View More</Button>
                                </CardActions>
                            </Card>
                        )
                    })}
                </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(MyClasses);
