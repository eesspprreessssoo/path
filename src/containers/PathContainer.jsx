import React from 'react';
import { connect } from 'react-redux';
import Path from '../components/Path.jsx';
import AddPath from '../components/AddPath.jsx';

const mapStateToProps = state => ({
  paths: state.paths;
  pathCount: state.paths.length;
  serial: state.serial;
})

const mapDispatchToProps = dispatch => ({
  addPath: actions.addPath
})

const PathContainer = ({ paths, serial }) => {
  const pathComponents = paths.map((path, index) => {
    return (
      <Path 
        key={`path${path.id}`}
        id={path.id}
        company={path.company}
        position={path.position}
        status={path.status}
        notes={path.notes}
        lastUpdated={path.lastUpdated}
        followUp={path.followUp}
        index={index}
      />
    )
  });

  return (
    <div id="path-container">
      {pathComponents}
      <AddPath addPath={this.props.addPath}/>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(PathContainer)