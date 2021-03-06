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
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

class Classes extends Component {

    constructor(props) {
        super(props);
        this.state = {
            classes: []
        };
        const url = 'http://localhost:9000/classes';
        fetch(url, {
            method: "get",
        })
            .then((data) => {
                data.json().then((classes) => {
                    this.setState({classes: classes});
                });
            })
            .catch((err) => {
                console.log(err);

            });
    }

    viewClass(value) {
        this.props.action_Types(value);
        this.props.history.push('/main/view-class/' + value._id);

    }

    render() {
        return (
            <div>
                <AppBar position="static">
                    <Toolbar><Typography variant="title" color="inherit">Classes</Typography></Toolbar>
                </AppBar>
                <div style={{display: "flex", flexWrap: "wrap", justifyContent: "center"}}>
                    {this.state.classes.map((val, ind) => {
                        return (
                            <Card key={ind} style={{
                                width: "20%", height: "130px", border: "solid 1px #bebebe",
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
                                    <Button size="small" onClick={this.viewClass.bind(this, val)} color="primary">View More</Button>
                                </CardActions>
                            </Card>
                        )
                    })}
                </div>
                {/*<Fab color="secondary" aria-label="Add" >*/}
                    {/*<AddIcon />*/}
                {/*</Fab>*/}
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
export default connect(mapStateToProps, mapDispatchToProps)(Classes);
