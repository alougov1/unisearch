import React, { Component } from "react";
import "./Login.css";
import Header from '../Header/Header';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
  }
  render() {
    return (
      <div>
        LOGIN REACHED
      </div>
    )
  }
}
