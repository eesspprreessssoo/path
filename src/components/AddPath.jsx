import React, { Component } from 'react';

class AddPath extends Component {
  constructor(props) {
    super(props);
    this.state = {
      company: '',
      position: '',
      notes: ''
    }
  }

  submit() {
    const path = {
      id: this.props.serial,
      company: this.state.company,
      position: this.state.position,
      status: [],
      notes: this.state.notes,
      lastUpdated: new Date(),
      followUp: ""
    }
    this.props.addPath(path);
    this.setState({
      company: '',
      position: '',
      notes: ''
    })
  }

  render() {
    return (
      <div id="add-path">
        <span>Company</span><input type="text" value={this.state.company} onChange={e => {this.setState({company: e.target.value})}} />
        <span>Position</span><input type="text" value={this.state.position} onChange={e => {this.setState({position: e.target.value})}} />
        <span>Notes</span><input type="text" value={this.state.notes} onChange={e => {this.setState({notes: e.target.value})}} />
        <button type="button" onClick={this.submit}>Submit</button>
      </div>
    )
  }
} 

export default AddPath;