import React, { Component } from 'react';
import { FormGroup, Form, Row, Col, FormControl, Button,
  ControlLabel, HelpBlock, Glyphicon, DropdownButton, MenuItem, Image,
  Media, Grid, } from 'react-bootstrap';
import './School.css';
import PropTypes from 'prop-types';


class School extends Component {

  constructor (props) {
    super(props)
    this.state = {
      uni_name: 'asda',
      school_name: 'asd',
      gpa_avg: 0.0,
      num_students: 0 ,
      act: 0 ,
      sat: 0 ,
      accpt_rate: 0.0 ,
      grad_rate: 0.0 
    }
  }

  componentDidMount() {

    fetch("/schoolInfo?uni=" + localStorage.getItem('currUniversity') + "&sch=" + localStorage.getItem('currSchool'))
            .then(res => {
                return res.json();
              }
            )
            .then(jsonRes => {
              console.log(jsonRes);
              this.setState({ uni_name: jsonRes[0].uni_name,
                              school_name: jsonRes[0].school_name,
                              gpa_avg: jsonRes[0].gpa_avg,
                              num_students: jsonRes[0].num_students,
                              act: jsonRes[0].act,
                              sat: jsonRes[0].sat,
                              accpt_rate: jsonRes[0].accpt_rate,
                              grad_rate: jsonRes[0].grad_rate
              });
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
                {this.state.uni_name}: {this.state.school_name}
              </Col>
          </Row>

          <Row>
            <Col xs='2' />
            <Col xs='2'>
              <label htmlFor='jobtitle'>
                Average GPA
              </label>
            </Col>
            <Col xs='8'>
              <p>{this.state.gpa_avg}</p>
            </Col>
          </Row>

          <Row>
            <Col xs='2' />
            <Col xs='2'>
              <label htmlFor='gender'>
                Number of Students
              </label>
            </Col>
            <Col xs='8'>
              <p>{this.state.num_students}</p>
            </Col>
          </Row>

          <Row>
            <Col xs='2' />
            <Col xs='2'>
              <label htmlFor='age'>
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
              <label htmlFor='age'>
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
              <label htmlFor='age'>
                Acceptance Rate
              </label>
            </Col>
            <Col xs='8'>
              <p>{this.state.accpt_rate}</p>
            </Col>
          </Row>

          <Row>
            <Col xs='2' />
            <Col xs='2'>
              <label htmlFor='age'>
                Graduation Rate
              </label>
            </Col>
            <Col xs='8'>
              <p>{this.state.grad_rate}</p>
            </Col>
          </Row>

      </Grid>
      </div>
    )
  }

}




export default School;
