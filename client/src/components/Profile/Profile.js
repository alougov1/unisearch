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
      username:   '',
      password:'',
      gpa:  0.0,
      act:  '0',
      sat:  '0',
      gender:   '',
      age:  0,
      hometown:   '',
      unis: [],
      deleteQuery: '',
      addQuery: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.toggleEdit = this.toggleEdit.bind(this)
    this.deleteUniList = this.deleteUniList.bind(this)
    this.addUniList = this.addUniList.bind(this)
  }

  componentDidMount() {
    fetch("/student?un=" + localStorage.getItem('currUser'))
            .then(res => {
                return res.json();
              }
            )
            .then(jsonRes => {
              this.setState({
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

    fetch("/uniList?un=" + localStorage.getItem('currUser'))
            .then(res => {
                return res.json();
              }
            )
            .then(jsonRes => {
              console.log(jsonRes);
              this.setState({
                unis: jsonRes
              });
            })
            .catch(error => {
              alert("Incorrect username or password--please try again.");
            })
  }

  deleteUniList() {
    fetch('/uniListDelete?un=' + localStorage.getItem('currUser') +
            "&uni=" + this.state.deleteQuery, {
                    method: 'POST',
                    headers: {'Access-Control-Allow-Origin':'*',
                    'Content-Type': 'multipart/form-data'}
                })
                .then(res => {
                  return res;
                })
                .catch(error => {
                  console.log(error);
                  alert("Error deleting university");
                });
  }

  addUniList() {
    fetch('/uniListAdd?un=' + localStorage.getItem('currUser') +
    "&uni=" + this.state.addQuery, {
            method: 'POST',
            headers: {'Access-Control-Allow-Origin':'*',
            'Content-Type': 'multipart/form-data'}
        })
        .then(res => {
          return res;
        })
        .catch(error => {
          console.log(error);
        //  alert("Error adding university");
        });
  }

  handleChange (event) {
    event.preventDefault()
    console.log(event.target.value);
    this.setState({
      [event.target.name]: event.target.value
    })

  }

  handleSubmit (event) {
    event.preventDefault()
    fetch('/studentUpdate?un=' + localStorage.getItem('currUser') +
    "&act=" + this.state.act +
    "&sat=" + this.state.sat + "&gpa=" + this.state.gpa + "&gender=" + this.state.gender +
    "&age=" + this.state.age + "&hometown=" + this.state.hometown, {
            method: 'POST',
            headers: {'Access-Control-Allow-Origin':'*',
            'Content-Type': 'multipart/form-data'}
        })
        .then(this.toggleEdit())
        .catch(error => {
        //  alert("Invalid inputs--try again.");
        });
  }

  toggleEdit() {
    this.setState({isEditing: !this.state.isEditing})
  }

  render() {
    let uninames = this.state.unis.map(uni => uni.uni_name);
    let unis = uninames.map(uniname => <li key={uniname}> {uniname} </li> );
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

          <Row>
          <Col xs='2' />
          <Col xs='8'>
            <p className='pleaseBold'>{this.state.username}'s University List</p>
            <ul className='unis'>
              {unis}
            </ul>
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

          <Row>
          <Col xs='2' />
          <Col xs='8'>
            <p className='pleaseBold'>{this.state.username}'s University List</p>
            <ul className='unis'>
              {unis}
            </ul>

              <Form onSubmit={this.deleteUniList}>
              <p>Type the name of the University you wish to delete</p>
              <input type='text' value={this.state.deleteQuery} onChange={this.handleChange} name='deleteQuery' />
              <button type="submit">Delete</button>
              </Form>

              <Form onSubmit={this.addUniList}>
              <p>Type the name of the University you wish to add to your University list</p>
              <input type='text' value={this.state.addQuery} onChange={this.handleChange} name='addQuery' />
              <button type="submit">Add</button>
              </Form>
          </Col>
          <Col>

          </Col>
          </Row>
      </Grid>
    );
    }

}




export default Profile;
