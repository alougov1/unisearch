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
    const unis = this.state.universities.map(uni => <tr key={uni}>{uni}</tr> );
    return (
      <div className="uniSearch">
        <Grid>
          <Row>
            <Col>
              <form>
                <input onChange={this.handleChange} />
              </form>
              <div className="Table-container">
              <table className="Table">
                <thead className="Table-head">
                    <tr>
                      <th>Universities</th>
                    </tr>
                  </thead>
                <tbody className="Table-body">
                  {unis}
                </tbody>
               </table>
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Search;
