import React, { Component } from 'react';
import firebase from 'firebase'

class Register extends Component {

    constructor(props){
        super(props);
        this.state = {
            name:'',
            email:'',
            password:'',
            phone:'',
        }
    }

    valueChange(p , e){
        this.setState({[p] : e.target.value})
    }
    addAccount() {
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then((data) => {
                console.log(data);
            })
            .catch((error) => {
                alert(error.message);
            });
    }

    render() {
        return (
            <div className="App">
                <input type="text" placeholder='Name' value={this.state.name} onChange={this.valueChange.bind(this, 'name')}/><br/>
                <input type="text" placeholder='Email' value={this.state.email} onChange={this.valueChange.bind(this, 'email')}/><br/>
                <input type="text" placeholder='Password' value={this.state.password} onChange={this.valueChange.bind(this, 'password')}/><br/>
                <input type="text" placeholder='Phone' value={this.state.phone} onChange={this.valueChange.bind(this, 'phone')}/>
                
            </div>
        );
    }
}

export default Register;
