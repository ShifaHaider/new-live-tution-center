import React, {Component} from 'react';

var schema = require('../../db/schema');
var ClassModel = schema.ClassModel;


class CreateClass extends Component {


    constructor() {
        super();
        this.state = {
            title: '',
            description: '',
            fee: '',
            gender: '',
            subject: 'English',
            days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

        }
    }
     getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for(var i = 0; i <ca.length; i++) {
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

    _changeValue(p, e) {
        this.setState({[p]: e.target.value});
    }

    createClass() {
        var userID = this.getCookie('userID');
        console.log(userID);
        console.log(this.state.subject);
        var classData = {
            title: this.state.title,
            description: this.state.description,
            gender: this.state.gender,
            fee: this.state.fee,
            subject: this.state.subject,
            userID: userID
        };
        const url = 'http://localhost:9000/create-class';
        fetch(url, {
            method: "post",
            body: JSON.stringify(classData),
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
    }

    _handleChange(event) {
        console.log(event);
        console.log(event.target.value);
        console.log(event.currentTarget.value);
        // this.setState({ value: event.currentTarget.value });
    }

    render() {
        return (
            <div>
                <input type="text" placeholder='Title' value={this.state.title}
                       onChange={this._changeValue.bind(this, 'title')}/><br/>
                <input type="text" placeholder='Description' value={this.state.description}
                       onChange={this._changeValue.bind(this, 'description')}/><br/>
                <input type="number" placeholder='Fee' value={this.state.fee}
                       onChange={this._changeValue.bind(this, 'fee')}/><br/>
                <form action="" onChange={this._changeValue.bind(this, 'gender')}>
                    <input type="radio" name="gender" value="male"/>Male <br/>
                    <input type="radio" name="gender" value="female"/>Female <br/>
                </form>
                <select name="Choose a Subject" id="" onChange={this._changeValue.bind(this , 'subject')}>
                <option value="English">English</option>
                <option value="Maths">Maths</option>
                <option value="Urdu">Urdu</option>
                <option value="Chemistry">Chemistry</option>
                </select>
                <br/>
                <button onClick={this.createClass.bind(this)}>Create</button>
            </div>
        );
    }
}

export default CreateClass;