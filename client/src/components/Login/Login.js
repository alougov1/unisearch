import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Login.css";
import { Grid, Row, Col, code} from 'react-bootstrap';
import { Redirect } from 'react-router-dom'

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      email: "",
      gpa: 0,
      act: 0,
      sat: 0,
      age: 0,
      gender: "",
      hometown: "",
      creatingAcc: false,
      authenticated: false,
    };
    this.toggleCreate = this.toggleCreate.bind(this);
  }

  toggleCreate() {
    this.setState({creatingAcc: !this.state.creatingAcc})
  }

  emptyForm() {
    return this.state.username.length > 0 && this.state.password.length > 0;
  }

  toggleAuthenticate() {
    this.setState({authenticated: !this.state.authenticated})
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  validateNewAcctForm() {
    var validator = require("email-validator");
    let flag = true;
    if (!validator.validate(this.state.email)) {
      alert("Please enter a valid email");
      flag = false;
    }
    if (!(this.state.gpa >= 0 && this.state.gpa <= 4.0 && this.state.gpa.length > 0)) {
      alert("Please enter a GPA between 0 and 4.0");
      flag = false;
    }
    if (!(this.state.act >= 0 && this.state.act <= 36)) {
      alert("Please enter an ACT between 0 and 36");
      flag = false;
    }
    if (!(this.state.sat >= 200 && this.state.sat <= 1600)) {
      alert("Please enter an SAT between 200 and 1600");
      flag = false;
    }
    if (!(this.state.age >= 1)) {
      alert("You're older than 0 years old--we know you are");
      flag = false;
    }
    if (!(this.state.gender.length > 0)) {
      alert("Please enter a gender");
      flag = false;
    }
    if (!(this.state.hometown.length > 0)) {
      alert("Please enter a hometown");
      flag = false;
    }
    return flag;
  }

  handleSubmit = event => {
    event.preventDefault();
    localStorage.setItem('currUser', this.state.username);
    localStorage.setItem('currPass', this.state.password);
    fetch("/validateUserLogin?un=" + this.state.username + "&pass=" + this.state.password)
            .then(res => {
                return res.json();
              }
            )
            .then(jsonRes => {
              console.log(jsonRes);
              if (jsonRes) {
                this.toggleAuthenticate()
              } else {
                alert("Incorrect username or password--please try again.");
              }
            })
            .catch(error => {
              alert("Incorrect username or password--please try again.");
            })
  }

  handleCreateAcct = event => {
    event.preventDefault();
    if (this.validateNewAcctForm()) {
    fetch("/createAcct?un=" + this.state.username + "&pass=" + this.state.password +
  "&email=" + this.state.email + "&fname=" + this.state.firstname + "&lname=" + this.state.lastname, {
          method: 'POST',
          headers: {'Access-Control-Allow-Origin':'*',
          'Content-Type': 'multipart/form-data'}
      })
      .then(res => {
          return res.json();
        })
      .then(jsonRes => {
        if (jsonRes) {
          this.toggleAuthenticate()
        }
      })
      .catch(error => {
        alert("Invalid inputs--please try again.")
      })
    }
  }

  render() {
    if(this.state.authenticated) {
      return <Redirect to='/components/Search/Search.js' />
    }
    if(this.state.creatingAcc) {
      return(
          <div className="container">
          <Grid>
              <Row>
                  <Col>
                      <div className="create">
                          <form onSubmit={this.handleCreateAcct}>
                          <FormGroup controlId="username" bsSize="large">
                              <ControlLabel>Enter a Username</ControlLabel>
                              <FormControl
                              type="username"
                              value={this.state.username}
                              onChange={this.handleChange}/>
                          </FormGroup>
                          <FormGroup controlId="password" bsSize="large">
                              <ControlLabel>Enter a Password</ControlLabel>
                              <FormControl
                              value={this.state.password}
                              onChange={this.handleChange}
                              type="password"/>
                          </FormGroup>
                          <FormGroup controlId="email" bsSize="large">
                              <ControlLabel>Enter an Email</ControlLabel>
                              <FormControl
                              value={this.state.email}
                              onChange={this.handleChange}
                              type="email"/>
                          </FormGroup>
                          <FormGroup controlId="gpa" bsSize="large">
                              <ControlLabel>Enter your GPA (4.0 Scale)</ControlLabel>
                              <FormControl
                              placeholder = "4.0"
                              value={this.state.gpa}
                              onChange={this.handleChange}
                              type="gpa"/>
                          </FormGroup>
                          <FormGroup controlId="act" bsSize="large">
                              <ControlLabel>Enter your ACT score, if applicable</ControlLabel>
                              <FormControl
                              value={this.state.act}
                              placeholder = "36"
                              onChange={this.handleChange}
                              type="act"/>
                          </FormGroup>
                          <FormGroup controlId="sat" bsSize="large">
                              <ControlLabel>Enter your SAT score, if applicable</ControlLabel>
                              <FormControl
                              value={this.state.sat}
                              placeholder = "1600"
                              onChange={this.handleChange}
                              type="sat"/>
                          </FormGroup>
                          <FormGroup controlId="gender" bsSize="large">
                              <ControlLabel>Enter your gender</ControlLabel>
                              <FormControl
                              value={this.state.gender}
                              onChange={this.handleChange}
                              type="gender"/>
                          </FormGroup>
                          <FormGroup controlId="age" bsSize="large">
                              <ControlLabel>Enter your age</ControlLabel>
                              <FormControl
                              value={this.state.age}
                              placeholder = ""
                              onChange={this.handleChange}
                              type="age"/>
                          </FormGroup>
                          <FormGroup controlId="hometown" bsSize="large">
                              <ControlLabel>Enter your hometown</ControlLabel>
                              <FormControl
                              value={this.state.hometown}
                              onChange={this.handleChange}
                              type="hometown"/>
                          </FormGroup>
                          <Button
                              block
                              bsSize="large"
                              disabled={!this.emptyForm()}
                              href="/components/Search/Search.js"
                              type="submit"
                              onClick={this.handleCreateAcct}>
                              Create
                          </Button>
                          </form>
                      </div>
                  </Col>
              </Row>
              <Row>
                <Col>
                  <Button
                    onClick={this.toggleCreate}
                    block
                    bsSize="large"
                    type="submit">
                      Login
                  </Button>
                </Col>
              </Row>
          </Grid>
        </div>
      );
    }
    return (
        <div className="container">
        <Grid>
            <Row>
                <Col>
                    <div className="Login">
                        <form onSubmit={this.handleSubmit}>
                        <FormGroup controlId="username" bsSize="large">
                            <ControlLabel>Username</ControlLabel>
                            <FormControl
                            type="username"
                            value={this.state.username}
                            onChange={this.handleChange}/>
                        </FormGroup>
                        <FormGroup controlId="password" bsSize="large">
                            <ControlLabel>Password</ControlLabel>
                            <FormControl
                            value={this.state.password}
                            onChange={this.handleChange}
                            type="password"/>
                        </FormGroup>
                        <Button
                            block
                            bsSize="large"
                            disabled={!this.emptyForm()}
                            type="submit">
                            Login
                        </Button>
                        </form>
                    </div>
                </Col>
            </Row>
            <Row>
              <Col>
                <Button
                  onClick={this.toggleCreate}
                  block
                  bsSize="large"
                  type="submit">
                    Create an Account
                </Button>
              </Col>
            </Row>
        </Grid>
      </div>
    );
  }
}
