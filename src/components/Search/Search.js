import React, { Component } from 'react';
import './Search.css';


class Search extends Component {
  constructor() {
    super();

    this.state = {
      searchQuery: '',

    }

    this.handleChange = this.handleChange.bind(this);
  }


  handleChange(event) {
    const inputValue = event.target.value;
    this.setState({ searchQuery: inputValue })
    console.log(this.state.searchQuery);
  }

  render() {
    return (
      <div className="uniSearch">

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
            <tbody className="Table-body"> { }
            </tbody>
        </table>
        </div>

      </div>
    );
  }
}

export default Search;