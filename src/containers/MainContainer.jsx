import React from 'react';
import { connect } from 'react-redux';
import UserDisplay from '../components/UserDisplay.jsx';
import PathContainer from './PathContainer.jsx';
import * as actions from '../actions/actions.js'

const mapStateToProps = state => ({
  name: state.paths.user.name,
  pathCount: state.paths.pathList.length,
})

const mapDispatchToProps = {

}

const MainContainer = ({name, pathCount}) => {
  return (
    <div id="main-container">
      <UserDisplay name={name} pathCount={pathCount} />
      <PathContainer />
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer)