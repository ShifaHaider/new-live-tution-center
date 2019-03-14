import React, { Component } from 'react';


class Classes extends Component {

    constructor(props){
        super(props);
        this.state = {
            classes: [],
        };
        const url = 'http://localhost:9000/classes';
        fetch(url, {
            method: "get",
        })
            .then((data) => {
                console.log(data);
                data.json().then((classes) => {
                    console.log(classes);
                    console.log(this.state.classes);
                    this.setState({classes: classes});
                });
            })
            .catch((err) => {
                console.log(err);

            });
    }



    render() {
        return (
            <div style={{display:"flex", flexWrap:"wrap",  justifyContent: "center"}}>
                {this.state.classes.map((val , ind)=>{
                    console.log(val);
                    return(
                        <div key={ind} style={{ width:"20%", height:"130px" , cursor: 'pointer', border:"solid 1px #bebebe",
                            borderRadius:"0px", margin:"2px", boxShadow:"none"}}>
                          <h4>{val.title}</h4>
                          <p>{val.subject}</p>
                        </div>
                    )
                })}
            </div>
        );
    }
}

export default Classes;