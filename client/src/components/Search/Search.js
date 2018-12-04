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
      people: [],
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
              alert("Something went wrong--give us a moment.");
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
              alert("Something went wrong when fetching your profile--give us a moment.");
            })
  }

  handleChange = event => {
    this.setState({ searchQuery: event.target.value }, () => {
      this.refreshUnis();
    })
  }

  handleUniClick = event => {
    this.setState({ selectedUni: event.target.textContent });
    console.log(this.state.selectedUni);
    console.log(this.state.selectedUni);
    // up here selectedUni is nothing
    fetch("/personOfInterestSelect?uni=" + this.state.selectedUni ) //still no value for the fetch call
            .then(res => {
                // but once we are here it has a value....
                console.log(this.state.selectedUni);
                return res.json();
              }
            )
            .then(jsonRes => {
              console.log("made it");
              console.log(this.state.selectedUni);
              this.setState({ people: jsonRes });
              console.log(jsonRes);
            })
            .catch(error => {
              alert("Incorrect username or password--please try again.");
    })  
  }

  render() {
    let uninames = this.state.universities.map(uni => uni.uni_name);
    let unis = uninames.map(uniname => <li key={uniname} onClick={this.handleUniClick}>{uniname}</li> );
    //selected university

    //let peoplenames = this.state.people.map(ppl => ppl.ppl_name);
    //console.log(peoplenames);
    //let people = peoplenames.map(peoplename => <li key={peoplename} onClick={this.handlepeopleClick}>{peoplename}</li> );
    let selected = this.state.universities.find(e => e.uni_name === this.state.selectedUni);
    let uniInfo = <ul></ul>
    if (selected !== undefined) {
      uniInfo = <ul key={selected.uni_name}>
          <li>Location: {selected.location}</li>
          <li>Avg Admitted GPA: {selected.gpa_avg}</li>
          <li>Avg ACT: {selected.act}</li>
          <li>Avg SAT: {selected.sat}</li>
          <li>Number of Students: {selected.num_students}</li>
          <li>Mascot: {selected.mascot}</li>
          <li>Number of Dining Halls: {selected.num_dining_halls}</li>
          <li>Acceptance Rate: {selected.accpt_rate}</li>
          <li>Athletic Conference: {selected.athletic_conf}</li>
          <li>Number of Colleges: {selected.num_colleges}</li>
          <li>Graduation Rate: {selected.grad_rate}</li>
        </ul>
      }
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
                <p>{this.state.selectedUni}</p>
                {uniInfo}
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
