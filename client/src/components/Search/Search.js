import React, { Component } from 'react';
import './Search.css';
import { FormGroup, Form, Row, Col, FormControl, Button,
  ControlLabel, HelpBlock, Glyphicon, DropdownButton, MenuItem, Image,
  Media, Grid, } from 'react-bootstrap';

class Search extends Component {
  constructor() {
    super();

    this.state = {
      searchQuery: '',
      universities: [],

    }

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.refreshUnis();
  }

  refreshUnis() {
    fetch("/university?un=" + this.state.searchQuery)
            .then(res => {
                return res.json();
              }
            )
            .then(jsonRes => {
              this.setState({
                universities: jsonRes
              });
            })
            .catch(error => {
              alert("Incorrect username or password--please try again.");
            })
  }

  handleChange = event => {
    this.setState({ searchQuery: event.target.value }, () => {
      this.refreshUnis();
    })
  }

  render() {
    let uninames = this.state.universities.map(uni => uni.uni_name);
    let unis = uninames.map(uni => <li key={uni}>{uni}</li> );
    return (
      <div className="uniSearch">
        <Grid>
          <Row>
            <Col>
              <form>
                <input onChange={this.handleChange} />
              </form>
              <div className="Table-container">
                <p>Universities</p>
                <ul>
                  {unis}
                </ul>
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Search;
