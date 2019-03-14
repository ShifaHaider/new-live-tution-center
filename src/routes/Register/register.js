import React, {Component} from 'react';
import firebase from 'firebase';


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
                console.log(userData);
                const url = 'http://localhost:9000/user-post';
                fetch(url, {
                    method: "post",
                    body: JSON.stringify(userData),
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    }
                }).then((data) => {
                    console.log(data);
                    data.json().then((a) => {
                        console.log(a);
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
                <input type="text" placeholder='Name' value={this.state.name}
                       onChange={this.valueChange.bind(this, 'name')}/><br/>
                <input type="text" placeholder='Email' value={this.state.email}
                       onChange={this.valueChange.bind(this, 'email')}/><br/>
                <input type="text" placeholder='Password' value={this.state.password}
                       onChange={this.valueChange.bind(this, 'password')}/><br/>
                <input type="text" placeholder='Phone' value={this.state.phone}
                       onChange={this.valueChange.bind(this, 'phone')}/><br/>
                <button onClick={this.createAccount.bind(this)}>Register</button>

            </div>
        );
    }
}

export default Register;
