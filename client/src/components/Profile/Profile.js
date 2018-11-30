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
      firstName: 'Your first name' ,
      lastName: 'Your last name' ,
      email:   'email',
      username:   'Username',
      password:'*******',
      gpa:  0.0,
      act:  '0',
      sat:  '0',
      gender:   '',
      age:  0,
      hometown:   '',



    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.toggleEdit = this.toggleEdit.bind(this)
  }

  handleChange (event) {
    event.preventDefault()
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit (event) {
    event.preventDefault()
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
              <Col xs='3'>
                <Media>
                  <img width={120} height={120} src={imggg} />
                </Media>
              </Col>
              <Col xs='9' className="name">
                NAME
              </Col>
          </Row>

          <Row>
            <Col xs='2' />
            <Col xs='2' className='fields'>
              <label htmlFor='firstName'>
                First Name
              </label>
            </Col>
            <Col xs='8'>
              <p>{this.state.firstName}</p>
            </Col>
          </Row>

          <Row>
            <Col xs='2' />
            <Col xs='2'>
              <label htmlFor='lastName'>
                Last Name
              </label>
            </Col>
            <Col xs='8'>
              {this.state.lastName}
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
          <Row>
              <Col xs='3'>
                <Media>
                  <img width={120} height={120} src={imggg} />
                </Media>
              </Col>
              <Col xs='9' className="name">
                NAME
              </Col>
          </Row>

          <Row>
            <Col xs='2' />
            <Col xs='2' className='fields'>
              <label htmlFor='firstName'>
                First Name
              </label>
            </Col>
            <Col xs='8'>
              <input type='text' value={this.state.firstName} onChange={this.handleChange} name='firstName' />
            </Col>
          </Row>

          <Row>
            <Col xs='2' />
            <Col xs='2'>
              <label htmlFor='lastName'>
                Last Name
              </label>
            </Col>
            <Col xs='8'>
              <input type='text' value={this.state.lastName} onChange={this.handleChange} name='lastName' />
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
              <input type='text' value={this.state.email} onChange={this.handleChange} name='email' />
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
            <Col xs='8'>
              <button onClick={this.toggleEdit}>edit</button>
            </Col>
          </Row>

      </Grid>
    );
    }

}




export default Profile;





