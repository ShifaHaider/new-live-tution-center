import React, {Component} from 'react';

var schema = require('../../db/schema2');
var ClassModel = schema.ClassModel;


class MyClasses extends Component {

    constructor(props) {
        super(props);
        this.state = {
            myClasses: [],
        };
        const url = 'http://localhost:9000/classes';
        fetch(url, {
            method: "get",
        })
            .then((data) => {
                console.log(data);
                data.json().then((classes) => {
                    console.log(classes);
                    // this.setState({classes: classes});
                });
            })
            .catch((err) => {
                console.log(err);

            });
    }


    render() {
        return (
            <div>
                <div style={{display: "flex", flexWrap: "wrap", justifyContent: "center"}}>
                    {this.state.myClasses.map((val, ind) => {
                        return (
                            <div key={ind} style={{
                                width: "20%", height: "130px", cursor: 'pointer', border: "solid 1px #bebebe",
                                borderRadius: "0px", margin: "2px", boxShadow: "none"
                            }}>
                                {/*<h4>{val}</h4>*/}
                            </div>
                        )
                    })}
                </div>
            </div>
        );
    }
}

export default MyClasses;