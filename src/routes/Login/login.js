import React, { Component } from 'react';
import firebase from 'firebase';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import NavigationIcon from '@material-ui/icons/Navigation';
import Fab from '@material-ui/core/Fab';

var schema = require('../../db/schema');
var UserModel = schema.UserModel;

class Login extends Component {

    constructor(props){
        super(props);
        this.state = {
            email:' ',
            password:' ',
        }
    }
     setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        var expires = "expires="+ d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    changeValue(p , e){
        this.setState({[p] : e.target.value})
    }
    loginAccount() {
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then((data) => {
                console.log(data);
                var userData = {
                    name: this.state.name,
                    email: this.state.email,
                    phone: this.state.phone,
                    _id: data.user.uid,
                };
                const url = 'http://localhost:9000/user-post';
                fetch(url, {
                    method: "post",
                    body: JSON.stringify(userData),
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    }
                }).then((data) => {
                    data.json().then((a) => {
                    });
                })
                    .catch((err) => {
                        console.log(err);
                    });
                // localStorage.setItem('userID' ,  data.user.uid);
                this.setCookie('userID' ,  data.user.uid , 1);
                this.props.history.push('/main/dashboard');
            })
            .catch((error) => {
                alert(error.message);
            });
    }


    loginGoogle() {
        var provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/plus.login');
        firebase.auth().signInWithPopup(provider).then((result) => {
            console.log(result);
            var profile = result.additionalUserInfo.profile;
            var data = {};
            data.name = profile.name;
            data.email = profile.email;
            data.picture = profile.picture;
            data._id = result.user.uid;
            const url = 'http://localhost:9000/user-post';
            fetch(url, {
                method: "post",
                body: JSON.stringify(data),
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            }).then((data) => {
                data.json().then((a) => {
                });
            })
                .catch((err) => {
                    console.log(err);
                });
            localStorage.setItem('userProfile', profile.picture);
            // localStorage.setItem('userID', result.user.uid);
            this.setCookie('userID' ,  data._id , 1);
            this.props.history.push('/main/dashboard');
        }).catch((function (error) {
                alert(error);
            })
        )
    }

    loginFacebook() {
        var provider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithPopup(provider).then((result) => {
            console.log(result);
            var data = {};
            data.name = result.additionalUserInfo.profile.name;
            data.email = result.additionalUserInfo.profile.email || 'No email';
            data.phone = result.additionalUserInfo.profile.phone || 'No phone number';
            data._id = result.user.uid;
            const url = 'http://localhost:9000/user-post';
            fetch(url, {
                method: "post",
                body: JSON.stringify(data),
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            }).then((data) => {
                data.json().then((a) => {
                });
            })
                .catch((err) => {
                    console.log(err);
                });
            localStorage.setItem('userProfile' , result.additionalUserInfo.profile.picture || null);
            // localStorage.setItem('userID', data._id);
            this.setCookie('userID' ,  data.user.uid , 1);
            this.props.history.push('/main/dashboard');

        }).catch((function (error) {
                alert(error);
            })
        )
    }
    render() {
        return (
            <div className="App">
                <AppBar position="static">
                    <Toolbar><Typography variant="title" color="inherit">Login</Typography></Toolbar>
                </AppBar>
                <Card style={{width: '416px' , textAlign: 'center' , height: '380px' , margin: '100px 400px 0'}}>
                    <CardContent>
                        <Typography>
                            <TextField
                                id="outlined-name"
                                label="Email"
                                value={this.state.email}
                                margin="normal"
                                variant="outlined"
                                onChange={this.changeValue.bind(this, 'email')}

                            />
                        </Typography>
                        <Typography>
                            <TextField
                                id="outlined-password-input"
                                label="Password"
                                type="password"
                                value={this.state.password}
                                autoComplete="current-password"
                                margin="normal"
                                variant="outlined"
                                onChange={this.changeValue.bind(this, 'password')}
                            />
                        </Typography>
                    </CardContent>
                    <Button variant="contained" color="primary" size='large' onClick={this.loginAccount.bind(this)}>Login</Button><br/><br/>
                    <Fab variant="extended" size="medium" style={{backgroundColor: 'red' , color: 'white'}}  aria-label="Add" onClick={this.loginGoogle.bind(this)}>
                        <NavigationIcon  />
                        Login with Google
                    </Fab><br/><br/>
                    <Fab variant="extended" size="medium" color="primary" aria-label="Add" onClick={this.loginFacebook.bind(this)}>
                        <NavigationIcon  />
                        Login with facebook
                    </Fab>
                </Card>

                {/*<but/!*ton onClick={this.loginAccount.bind(this)}>Login</button>*/}
                {/*<br/>*/}
                {/*<button onClick={this.loginGoogle.bind(this)}>Login with Google</button>*/}
                {/*<br/>*/}
                {/*<button onCl*!/ick={this.loginFacebook.bind(this)}>Login with facebook</button>*/}

            </div>
        );
    }
}

export default Login;
