import React, {Component} from 'react';
import firebase from 'firebase';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            phone: '',
        }
    }

    valueChange(p, e) {
        this.setState({[p]: e.target.value})
    }

    createAccount() {
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
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
                this.props.history.push('/login');
            })
            .catch((error) => {
                alert(error.message);
            });
    }

    render() {
        return (
            <div className="App">
                <AppBar position="static">
                    <Toolbar><Typography variant="title" color="inherit">Register</Typography></Toolbar>
                </AppBar>
                <Card style={{width: '416px', textAlign: 'center', height: '420px', margin: '80px 400px 0'}}>
                    <CardContent>
                        <Typography>
                            <TextField id="outlined-name" label="Name" value={this.state.name} margin="normal"
                                       variant="outlined" onChange={this.valueChange.bind(this, 'name')}/>
                        </Typography>
                        <Typography>
                            <TextField id="outlined-name" label="Email" value={this.state.email} margin="normal"
                                       variant="outlined" onChange={this.valueChange.bind(this, 'email')}

                            />
                        </Typography>
                        <Typography>
                            <TextField id="outlined-password-input" label="Password" type="password"
                                       value={this.state.password} autoComplete="current-password"
                                       margin="normal" variant="outlined" onChange={this.valueChange.bind(this, 'password')}/>
                        </Typography>
                        <Typography>

                            <TextField id="outlined-number" label="Number"
                                value={this.state.phone} onChange={this.valueChange.bind(this, 'phone')} type="number"
                                InputLabelProps={{shrink: true,}} margin="normal" variant="outlined"/>
                        </Typography>
                    </CardContent>
                    <Button variant="contained" color="primary" size='large'
                            onClick={this.createAccount.bind(this)}>Register</Button><br/><br/>
                </Card>
            </div>
        );
    }
}

export default Register;
