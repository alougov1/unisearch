import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Login.css";
import { Grid, Row, Col, code} from 'react-bootstrap';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: ""
    };
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
    console.log(this.state.username);
    console.log(this.state.password);
  }

  render() {
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
        </Grid>
      </div>
    );
  }
}
