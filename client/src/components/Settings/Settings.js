import React, { Component } from 'react';
import { FormGroup, Form, Row, Col, FormControl, Button,
  ControlLabel, HelpBlock, Glyphicon, DropdownButton, MenuItem, Image,
  Media, Grid, } from 'react-bootstrap';

class Settings extends Component {

  constructor (props) {
    super(props)
    this.state = {
      isEditing: false,
      email:   'aaaaaaaa',
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
            <Col>
              <Form>
                <input type='text' value={this.state.email} onChange={this.handleChange} name='email' />
              </Form>
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