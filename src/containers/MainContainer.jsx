import React from 'react';
import { connect } from 'react-redux';
import UserDisplay from '../components/UserDisplay.jsx';
import PathContainer from './PathContainer.jsx';

const mapStateToProps = state => ({
  name: state.user.name;
  pathCount: state.paths.length;
})

const mapDispatchToProps = dispatch => ({

})

const MainContainer = ({}) => {
  return (
    <div id="main-container">
      <UserDisplay name={name} pathCount={pathCount} />
      <PathContainer />
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer)