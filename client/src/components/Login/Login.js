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
      firstname: "",
      lastname: "",
      creatingAcc: false,
    };
    this.toggleCreate = this.toggleCreate.bind(this);
  }

  toggleCreate() {
    this.setState({creatingAcc: !this.state.creatingAcc})
  }

  emptyForm() {
    return this.state.username.length > 0 && this.state.password.length > 0;
  }

  validateForm() {

  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
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
                console.log('asdfasdfasdfasdf');
                //FIX THIS 
                return <Redirect to='../search/search.js' />
              }
            })
            .catch(error => {
              alert("Incorrect username or password--please try again.");
            })
  }

  render() {
    if(this.state.creatingAcc) {
      return(
          <div className="container">
          <Grid>
              <Row>
                  <Col>
                      <div className="create">
                          <form onSubmit={this.handleSubmit}>
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
                              value={this.state.password}
                              onChange={this.handleChange}
                              type="email"/>
                          </FormGroup>
                          <FormGroup controlId="firstname" bsSize="large">
                              <ControlLabel>Enter your First Name</ControlLabel>
                              <FormControl
                              value={this.state.password}
                              onChange={this.handleChange}
                              type="firstname"/>
                          </FormGroup>
                          <FormGroup controlId="lastname" bsSize="large">
                              <ControlLabel>Enter your Last Name</ControlLabel>
                              <FormControl
                              value={this.state.password}
                              onChange={this.handleChange}
                              type="lastname"/>
                          </FormGroup>
                          <Button
                              block
                              bsSize="large"
                              disabled={!this.emptyForm()}
                              href="/components/Search/Search.js"
                              type="submit">
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
