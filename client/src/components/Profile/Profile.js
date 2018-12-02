import React, { Component } from 'react';
import { FormGroup, Form, Row, Col, FormControl, Button,
  ControlLabel, HelpBlock, Glyphicon, DropdownButton, MenuItem, Image,
  Media, Grid, } from 'react-bootstrap';
import imggg from './listtt.png';
import './Profile.css';
import PropTypes from 'prop-types';


class Profile extends Component {

  constructor (props) {
    super(props)
    this.state = {
      isEditing: false,
      firstName: '',
      lastName: '' ,
      email:   '',
      username:   '',
      password:'',
      gpa:  0.0,
      act:  '0',
      sat:  '0',
      gender:   '',
      age:  0,
      hometown:   '',
      data: [],
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.toggleEdit = this.toggleEdit.bind(this)
  }

  componentDidMount() {
    fetch("/student?un=" + localStorage.getItem('currUser'))
            .then(res => {
                return res.json();
              }
            )
            .then(jsonRes => {
              console.log(jsonRes);
              this.setState({ firstName: jsonRes[0].username,
                              email: jsonRes[0].email,
                              gpa: jsonRes[0].gpa,
                              act: jsonRes[0].act,
                              sat: jsonRes[0].sat,
                              gender: jsonRes[0].gender,
                              age: jsonRes[0].age,
                              hometown: jsonRes[0].hometown,
                              username: jsonRes[0].username });
            })
            .catch(error => {
              alert("Incorrect username or password--please try again.");
            })
  }

  handleChange (event) {
    event.preventDefault()
    this.setState({
      [event.target.name]: event.target.value
    })
    console.log(event.target.value);

  }

  handleSubmit (event) {
    event.preventDefault()
    let databody = {
      "email": this.state.email,
      "username": this.state.username,
      "gpa": this.state.gpa
    }
    fetch('/studentUpdate?un=' + localStorage.getItem('currUser') +
    "&email=" + this.state.email + "&act=" + this.state.act +
    "&sat=" + this.state.sat + "&gender=" + this.state.gender +
    "&age=" + this.state.age + "&hometown=" + this.state.hometown, {
            method: 'POST',
        //    body: JSON.stringify(databody),
            headers: {'Access-Control-Allow-Origin':'*',
            'Content-Type': 'multipart/form-data'}
        })
        .then(this.toggleEdit())
        .catch(error => {
          alert("??");
          console.log(error);
        });
  }

  toggleEdit() {
    this.setState({isEditing: !this.state.isEditing})
  }

  render() {
  if (!this.state.isEditing) {
    return(
      <div>
        <Grid>
          <Row>
              <Col xs='2'>
              </Col>
              <Col xs='9' className="name">
                {this.state.username}
              </Col>
          </Row>

          <Row>
            <Col xs='2' />
            <Col xs='2' className='fields'>
              <label htmlFor='firstName'>
                Username
              </label>
            </Col>
            <Col xs='8'>
              <p>{this.state.username}</p>
            </Col>
          </Row>

          <Row>
            <Col xs='2' />
            <Col xs='2'>
              <label htmlFor='email'>
                Email
              </label>
            </Col>
            <Col xs='8'>
              <p>{this.state.email}</p>
            </Col>
          </Row>

          <Row>
            <Col xs='2' />
            <Col xs='2'>
              <label htmlFor='gpa'>
                GPA
              </label>
            </Col>
            <Col xs='8'>
              <p>{this.state.gpa}</p>
            </Col>
          </Row>

          <Row>
            <Col xs='2' />
            <Col xs='2'>
              <label htmlFor='act'>
                ACT
              </label>
            </Col>
            <Col xs='8'>
              <p>{this.state.act}</p>
            </Col>
          </Row>

          <Row>
            <Col xs='2' />
            <Col xs='2'>
              <label htmlFor='sat'>
                SAT
              </label>
            </Col>
            <Col xs='8'>
              <p>{this.state.sat}</p>
            </Col>
          </Row>

          <Row>
            <Col xs='2' />
            <Col xs='2'>
              <label htmlFor='gender'>
                Gender
              </label>
            </Col>
            <Col xs='8'>
              <p>{this.state.gender}</p>
            </Col>
          </Row>

          <Row>
            <Col xs='2' />
            <Col xs='2'>
              <label htmlFor='age'>
                Age
              </label>
            </Col>
            <Col xs='8'>
              <p>{this.state.age}</p>
            </Col>
          </Row>

          <Row>
            <Col xs='2' />
            <Col xs='2'>
              <label htmlFor='hometown'>
                Hometown
              </label>
            </Col>
            <Col xs='8'>
              <p>{this.state.hometown}</p>
            </Col>
          </Row>

          <Row>
            <Col xs='2' />
            <Col xs='8'>
              <button onClick={this.toggleEdit}>edit</button>
            </Col>


          </Row>

      </Grid>
      </div>
    )
  }

    return (
      <Grid>
        <Form onSubmit={this.handleSubmit}>
          <Row>
              <Col xs='2'>
              </Col>
              <Col xs='9' className="name">
              {this.state.username}
              </Col>
          </Row>

          <Row>
            <Col xs='2' />
            <Col xs='2' className='fields'>
              <label htmlFor='firstName'>
                Username
              </label>
            </Col>
            <Col xs='8'>
              <input type='text' value={this.state.username} onChange={this.handleChange} name='username' />
            </Col>
          </Row>

          <Row>
            <Col xs='2' />
            <Col xs='2'>
              <label htmlFor='email'>
                Email
              </label>
            </Col>
            <Col xs='8'>
              <input type='text' value={this.state.email} onSubmit={this.handleSubmit} onChange={this.handleChange} name='email' />
            </Col>
          </Row>

          <Row>
            <Col xs='2' />
            <Col xs='2'>
              <label htmlFor='gpa'>
                GPA
              </label>
            </Col>
            <Col xs='8'>
              <input type='text' value={this.state.gpa} onChange={this.handleChange} name='gpa' />
            </Col>
          </Row>

          <Row>
            <Col xs='2' />
            <Col xs='2'>
              <label htmlFor='act'>
                ACT
              </label>
            </Col>
            <Col xs='8'>
              <input type='text' value={this.state.act} onChange={this.handleChange} name='act' />
            </Col>
          </Row>

          <Row>
            <Col xs='2' />
            <Col xs='2'>
              <label htmlFor='sat'>
                SAT
              </label>
            </Col>
            <Col xs='8'>
              <input type='text' value={this.state.sat} onChange={this.handleChange} name='sat' />
            </Col>
          </Row>

          <Row>
            <Col xs='2' />
            <Col xs='2'>
              <label htmlFor='gender'>
                Gender
              </label>
            </Col>
            <Col xs='8'>
              <input type='text' value={this.state.gender} onChange={this.handleChange} name='gender' />
            </Col>
          </Row>

          <Row>
            <Col xs='2' />
            <Col xs='2'>
              <label htmlFor='age'>
                Age
              </label>
            </Col>
            <Col xs='8'>
              <input type='text' value={this.state.age} onChange={this.handleChange} name='age' />
            </Col>
          </Row>

          <Row>
            <Col xs='2' />
            <Col xs='2'>
              <label htmlFor='hometown'>
                Hometown
              </label>
            </Col>
            <Col xs='8'>
              <input type='text' value={this.state.hometown} onChange={this.handleChange} name='hometown' />
            </Col>
          </Row>

          <Row>
            <Col xs='2' />
            <Col xs='2'>
              <button onClick={this.toggleEdit}>edit</button>
            </Col>
            <Col xs='6'>
              <button type="submit">Submit</button>
            </Col>
          </Row>
        </Form>
      </Grid>
    );
    }

}




export default Profile;
