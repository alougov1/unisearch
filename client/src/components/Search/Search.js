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
      selectedUni: '',
      username: '',
      gpa:  0.0,
      act:  '0',
      sat:  '0',
      gender: '',
      age:  0,
      hometown: '',

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

  fetch("/student?un=" + localStorage.getItem('currUser'))
            .then(res => {
                return res.json();
              }
            )
            .then(jsonRes => {
              console.log(jsonRes);
              this.setState({ gpa: jsonRes[0].gpa,
                              act: jsonRes[0].act,
                              sat: jsonRes[0].sat,
                              gender: jsonRes[0].gender,
                              age: jsonRes[0].age,
                              hometown: jsonRes[0].hometown,
                              username: jsonRes[0].username });
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
          </Row> 
          <Row>
            <Col xs='4'>
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
               
            <Col xs='4'>

            </Col>

            <Col xs='4'>
              <p>{this.state.username}'s Info</p>
              <ul>
                <li>{this.state.username}</li>
                <li>{this.state.gpa}</li>
                <li>{this.state.act}</li>
                <li>{this.state.sat}</li>
                <li>{this.state.gender}</li>
                <li>{this.state.age}</li>
                <li>{this.state.hometown}</li>
                
              </ul> 
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Search;
