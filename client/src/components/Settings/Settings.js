import React, { Component } from 'react';
import { Form, Row, Col, Grid, } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

class Settings extends Component {

  constructor (props) {
    super(props)
    this.state = {
      isEditing: false,
      email: '',
      isDeleted: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.toggleEdit = this.toggleEdit.bind(this)
    this.deleteAcc = this.deleteAcc.bind(this);
  }

  handleChange (event) {
    event.preventDefault();
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
              this.setState({ email: jsonRes[0].email});
            })
            .catch(error => {
              console.log(error);
              alert("Incorrect username or password--please try again.");
            })
  }

  toggleDeleted() {
    localStorage.setItem('authenticated', 'false');
    this.setState({ isDeleted: true });
  }

  deleteAcc (event) {
    event.preventDefault();
    fetch("/studentDelete?un=" + localStorage.getItem('currUser'))
            .then(this.toggleDeleted())
            .catch(error => {
              console.log(error);
              alert("We couldn't delete this account--uh oh.");
            })
  }

  handleSubmit (event) {
    event.preventDefault();
    fetch('/studentEmailUpdate?un=' + localStorage.getItem('currUser') +
    "&email=" + this.state.email, {
            method: 'POST',
            headers: {'Access-Control-Allow-Origin':'*',
            'Content-Type': 'multipart/form-data'}
        })
        .then(this.toggleEdit())
        .catch(error => {
          alert("Problem submitting email--please try again.");
          console.log(error);
        });
  }

  toggleEdit() {
    this.setState({isEditing: !this.state.isEditing});
  }

  render() {
    if (this.state.isDeleted) {
      return <Redirect to='/' />;
    }
    if (this.state.isEditing) {
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
            <button onClick={this.deleteAcc}>Delete Your Account</button>
          </Row>
        </Grid>
      </div>
      )
    } else {
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
            <button onClick={this.deleteAcc}>Delete Your Account</button>
          </Row>
        </Grid>
      </div>
    );
  }}
}

export default Settings;
