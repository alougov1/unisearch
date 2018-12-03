import React, { Component } from 'react';
import { FormGroup, Form, Row, Col, FormControl, Button,
  ControlLabel, HelpBlock, Glyphicon, DropdownButton, MenuItem, Image,
  Media, Grid, } from 'react-bootstrap';

class Settings extends Component {

  constructor (props) {
    super(props)
    this.state = {
      isEditing: false,
      email: '',
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

  componentDidMount() {
    fetch("/student?un=" + localStorage.getItem('currUser'))
            .then(res => {
                return res.json();
              }
            )
            .then(jsonRes => {
              console.log(jsonRes);
              this.setState({ email: jsonRes[0].email});
            })
            .catch(error => {
              alert("Incorrect username or password--please try again.");
            })
  }

  handleSubmit (event) {
    event.preventDefault()
    fetch('/studentEmailUpdate?un=' + localStorage.getItem('currUser') +
    "&email=" + this.state.email, {
            method: 'POST',
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
    if(!this.state.isEditing) {
      return (
        <div>
        <Grid>
          <Row>
            Settings
          </Row>
          <Row>
            <Col>
              <label htmlFor='email'>
                  Email
              </label>
            </Col>
            <Form onSubmit={this.handleSubmit}>
            <Col>
                <input type='text' value={this.state.email} onChange={this.handleChange} name='email' />
              
            </Col>
            <Col>
              <button onClick={this.toggleEdit}>edit</button>
            </Col>
            <Col>
              <button type="submit">Submit</button>
            </Col>
            </Form>
          </Row>

          <Row>
            
          </Row>
          <Row>
            <button>Delete Your Account</button>
          </Row>
        </Grid>
      </div>
      )
    }
    return (
      <div>
        <Grid>
          <Row>
            Settings
          </Row>
          <Row>
            <Col>
              <label htmlFor='email'>
                  Email
              </label>
            </Col>
            <Col>
              <p>{this.state.email}</p>
            </Col>
            <Col>
              <button onClick={this.toggleEdit}>edit</button>
            </Col>
          </Row>
          
          <Row>

          </Row>
          <Row>
            <button>Delete Your Account</button>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Settings;