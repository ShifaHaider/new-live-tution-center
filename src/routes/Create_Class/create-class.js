import React, {Component} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import IconButton from '@material-ui/core/IconButton';
import MoreIcon from '@material-ui/icons/MoreVert';

// import { MuiPickersUtilsProvider, TimePicker, DatePicker } from 'material-ui-pickers';


class CreateClass extends Component {

    constructor() {
        super();
        this.state = {
            title: '',
            description: '',
            fee: '',
            recStatus: 'Recurring',
            subject: 'English',
            startTime: '',
            endTime: '',
            days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            name : []

        }
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

    changeValue(p, e) {
        this.setState({[p]: e.target.value});
    }

    createClass() {
        var userID = this.getCookie('userID');
        var classData = {
            title: this.state.title,
            description: this.state.description,
            recurringStatus: this.state.recStatus,
            fee: this.state.fee,
            subject: this.state.subject,
            startTime: this.state.startTime,
            endTime: this.state.endTime,
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
            data.json().then((a) => {
                // console.log(a);
            });
        })
            .catch((err) => {
                console.log(err);
            });
    }

    handleChange = event => {
        this.setState({ name: event.target.value });
    };
    render() {
        this.names = ['Sunday , Monday , Tuesday , Wednesday' , 'Thursday' , 'Friday' , 'Saturday'];
        return (
            <div>
                <AppBar position="static">
                    <Toolbar><Typography variant="title" color="inherit">Create_Class</Typography>
                        <div style={{position: 'absolute' , right: '47px'}}>
                            <IconButton color="inherit" >
                                <MoreIcon />
                            </IconButton>
                        </div>
                    </Toolbar>
                </AppBar>
                <div>
                <Card style={{width:'416px' , margin: '20px 0 0 40px'}}>
                    <CardContent>
                        <TextField id="outlined-name" label="Title" fullWidth margin="normal" variant="outlined"
                            value={this.state.title} onChange={this.changeValue.bind(this, 'title')}/>
                        <br/>
                        <TextField id="outlined-textarea" label="Description"  margin="normal" variant="outlined" fullWidth
                                   multiline value={this.state.description}  onChange={this.changeValue.bind(this, 'description')}/>
                        <br/>
                        <TextField id="outlined-name" label="Fee" margin="normal" variant="outlined" fullWidth
                            type="number" value={this.state.fee} onChange={this.changeValue.bind(this, 'fee')}/><br/>
                        <FormLabel component="legend">Your class is</FormLabel>
                        <RadioGroup aria-label="Gender" name="gender1"
                            value={this.state.recStatus} onChange={this.changeValue.bind(this, 'recStatus')}>
                            <FormControlLabel value="Recurring" control={<Radio />} label="Recurring" />
                            <FormControlLabel value="One Time" control={<Radio />} label="One Time" />
                        </RadioGroup>
                        <FormControl>
                            <InputLabel htmlFor="select-multiple-checkbox">How many days in a week</InputLabel>
                            <Select style={{width: '380px' , textAlign: 'left'}}
                                multiple value={this.state.name} onChange={this.handleChange}
                                input={<Input id="select-multiple-checkbox" />} renderValue={selected => selected.join(', ')}
                                // MenuProps={MenuProps}
                            >
                                {this.state.days.map(name => (
                                    <MenuItem key={name} value={name}>
                                        <Checkbox checked={this.state.name.indexOf(name) > -1} />
                                        <ListItemText primary={name} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl><br/><br/>
                        <TextField id="date" variant="outlined" fullWidth label="Date"
                            type="date" defaultValue="2017-05-24" InputLabelProps={{shrink: true,}}/>
                    </CardContent>
                    <Button variant="contained" color="primary" size='large'
                            onClick={this.createClass.bind(this)}>Create</Button><br/><br/>

                </Card>
                </div>

                {/*<input type="text" placeholder='Title' value={this.state.title}*/}
                       {/*onChange={this._changeValue.bind(this, 'title')}/><br/>*/}
                {/*<input type="text" placeholder='Description' value={this.state.description}*/}
                       {/*onChange={this._changeValue.bind(this, 'description')}/><br/>*/}
                {/*<input type="number" placeholder='Fee' value={this.state.fee}*/}
                       {/*onChange={this._changeValue.bind(this, 'fee')}/><br/>*/}
                {/*<form action="" onChange={this._changeValue.bind(this, 'recStatus')}>*/}
                    {/*<input type="radio" name="gender" value="Recurring"/>Recurring <br/>*/}
                    {/*<input type="radio" name="gender" value="One Time"/>One Time <br/>*/}
                {/*</form>*/}

                {/*<br/>*/}
                {/*{this.state.recStatus === 'Recurring' ?*/}
                {/*<select multiple className="chosen-select" name="test" onChange={this.test.bind(this)}>*/}
                    {/*<option>Sunday</option>*/}
                    {/*<option>Giant Panda </option>*/}
                    {/*<option>Sloth Bear</option>*/}
                    {/*<option>Sun Bear</option>*/}
                    {/*<option>Polar Bear</option>*/}
                {/*</select> : <input type="date" onChange={this._changeValue.bind(this, 'recStatus')}/> }*/}
                {/*<br/>*/}
                {/*<select name="Choose a Subject" id="" onChange={this._changeValue.bind(this, 'subject')}>*/}
                    {/*<option value="English">English</option>*/}
                    {/*<option value="Maths">Maths</option>*/}
                    {/*<option value="Urdu">Urdu</option>*/}
                    {/*<option value="Chemistry">Chemistry</option>*/}
                {/*</select>*/}
                {/*<br/>*/}
                {/*Start time: <input type="time" name="usr_time" onChange={this._changeValue.bind(this, 'startTime')}/><br/>*/}
                {/*End time: <input type="time" name="usr_time" onChange={this._changeValue.bind(this, 'endTime')}/>*/}
                {/*<br/>*/}
                {/*<button onClick={this.createClass.bind(this)}>Create</button>*/}
            </div>
        );
    }
}

export default CreateClass;