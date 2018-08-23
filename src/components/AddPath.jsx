import React, { Component } from 'react';

class AddPath extends Component {
  constructor(props) {
    super(props);
    this.state = {
      company: '',
      position: '',
      notes: ''
    }
    this.submit = this.submit.bind(this)
  }

  submit() {
    const path = {
      id: this.props.serial,
      company: this.state.company,
      position: this.state.position,
      status: ['Watching'],
      notes: this.state.notes,
      lastUpdated: new Date(),
      followUp: ""
    }
    console.log(path);
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
        <span><strong>Add a New Path!</strong></span>
        <div>
          <span>Company</span><input type="text" value={this.state.company} onChange={e => {this.setState({company: e.target.value})}} />
        <div>
        </div>
          <span>Position</span><input type="text" value={this.state.position} onChange={e => {this.setState({position: e.target.value})}} />
        <div>
        </div>
          <span>Notes</span><input type="text" value={this.state.notes} onChange={e => {this.setState({notes: e.target.value})}} />
        </div>
        <button type="button" onClick={this.submit}>Submit</button>
      </div>
    )
  }
} 

export default AddPath;