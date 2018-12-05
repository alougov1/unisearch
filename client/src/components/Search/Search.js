import React, { Component } from 'react';
import './Search.css';
import { FormGroup, Form, Row, Col, FormControl, Button,
  ControlLabel, HelpBlock, Glyphicon, DropdownButton, MenuItem, Image,
  Media, Grid, } from 'react-bootstrap';
  import { Redirect } from 'react-router-dom'

class Search extends Component {
  constructor() {
    super();

    this.state = {
      searchQuery: '',
      universities: [],
      selectedUni: '',
      people: [],
      schools: [],
      username: '',
      gpa:  0.0,
      act:  '0',
      sat:  '0',
      gender: '',
      age:  0,
      hometown: '',
      schoolClicked: false,
      personClicked: false

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
    this.setState({ selectedUni: event.target.textContent }, () => {
    localStorage.setItem('currUniversity', this.state.selectedUni);
    fetch("/personOfInterestSelect?uni=" + this.state.selectedUni)
            .then(res => {
                return res.json();
              }
            )
            .then(jsonRes => {
              this.setState({ people: jsonRes });
            })
            .catch(error => {
              alert("We're having trouble getting people of interest--please try again.");
    })
    fetch("/school?uni=" + this.state.selectedUni)
            .then(res => {
                return res.json();
              }
            )
            .then(jsonRes => {
              this.setState({ schools: jsonRes });
            })
            .catch(error => {
              alert("Uh oh--something went wrong with getting school information.  Please try again.");
    })
    })
  }

  handleSchoolClick = event => {
    localStorage.setItem('currSchool', event.target.textContent);
    this.setState({ schoolClicked: true});
  }

  handlePeopleClick = event => {
    localStorage.setItem('currPerson', event.target.textContent);
    this.setState({ personClicked: true});
  }

  render() {
    if(this.state.schoolClicked) {
      return <Redirect to='/components/School/School.js' />
    }
    if(this.state.personClicked) {
      return <Redirect to='/components/People/People.js' />
    }
    let uninames = this.state.universities.map(uni => uni.uni_name);
    let unis = uninames.map(uniname => <li key={uniname} onClick={this.handleUniClick}>{uniname}</li> );

    let peoplenames = this.state.people.map(ppl => ppl.p_name);
    let people = peoplenames.map(peoplename => <li key={peoplename} onClick={this.handlePeopleClick}>{peoplename}</li> );

    let schoolnames = this.state.schools.map(sch => sch.school_name);
    let schools = schoolnames.map(schoolname => <li key={schoolname} onClick={this.handleSchoolClick}>{schoolname}</li> );

    let selected = this.state.universities.find(e => e.uni_name === this.state.selectedUni);
    let uniInfo = <ul></ul>
    if (selected !== undefined) {
      uniInfo = <ul key={selected.uni_name} className='unclickUnis'>
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
              <div className="Table-container">
                <p className='pleaseBold'>Universities</p>
                <form>
                  <input className='paddingg' onChange={this.handleChange} />
                </form>
                <ul className='paddingg'>
                  {unis}
                </ul>
              </div>
            </Col>

            <Col xs='5'>
                <p className='pleaseBold'>Selected University:</p>
                <p>{this.state.selectedUni}</p>
                {uniInfo}
                <p className='pleaseBold'>People of Interest</p>
                {people}
                <p className='pleaseBold'>Schools</p>
                {schools}
            </Col>

            <Col xs='3'>
              <p className='pleaseBold'>{this.state.username}'s Info</p>
              <ul>
              <p>Username: </p><li>{this.state.username}</li>
              <p>GPA: </p><li>{this.state.gpa}</li>
              <p>ACT: </p><li>{this.state.act}</li>
              <p>SAT: </p><li>{this.state.sat}</li>
              <p>Gender: </p><li>{this.state.gender}</li>
              <p>Age: </p><li>{this.state.age}</li>
              <p>Hometown: </p><li>{this.state.hometown}</li>

              </ul>
            </Col>
          </Row>
          <Row>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Search;
