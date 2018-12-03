import React, { Component } from 'react';
import { FormGroup, Form, Row, Col, FormControl, Button,
  ControlLabel, HelpBlock, Glyphicon, DropdownButton, MenuItem, Image,
  Media, Grid, } from 'react-bootstrap';
import imggg from './listtt.png';
import './People.css';
import PropTypes from 'prop-types';


class People extends Component {

  constructor (props) {
    super(props)
    this.state = {
      isEditing: false,
      name: '',
      jobTitle: '',
      gender: '',
      age: '',
      university: '',


    }

  }



  render() {
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

      </Grid>
      </div>
    )
  }

}




export default People;
