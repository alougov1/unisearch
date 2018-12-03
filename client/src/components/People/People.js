import React, { Component } from 'react';
import { FormGroup, Form, Row, Col, FormControl, Button,
  ControlLabel, HelpBlock, Glyphicon, DropdownButton, MenuItem, Image,
  Media, Grid, } from 'react-bootstrap';
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

  componentDidMount() {
    localStorage.setItem('currPerson', "Joseph Aoun")

    fetch("/personOfInterest?un=" + localStorage.getItem('currPerson'))
            .then(res => {
                return res.json();
              }
            )
            .then(jsonRes => {
              console.log(jsonRes);
              this.setState({ name: jsonRes[0].p_name,
                              jobTitle: jsonRes[0].job_title,
                              gender: jsonRes[0].gender,
                              age: jsonRes[0].age, 
                              university: jsonRes[0].university,});
            })
            .catch(error => {
              alert("Incorrect username or password--please try again.");
            })
  }

  render() {
    return(
      <div>
        <Grid>
          <Row>
              <Col xs='2'>
              </Col>
              <Col xs='9' className="name">
                {this.state.name}
              </Col>
          </Row>

            <Row>
              <Col xs='2' />
              <Col xs='2'>
                <label htmlFor='university'>
                  University
                </label>
              </Col>
              <Col xs='8'>
                <p>{this.state.university}</p>
              </Col>
          </Row>

          <Row>
            <Col xs='2' />
            <Col xs='2'>
              <label htmlFor='jobtitle'>
                Job Title
              </label>
            </Col>
            <Col xs='8'>
              <p>{this.state.jobTitle}</p>
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

      </Grid>
      </div>
    )
  }

}




export default People;
