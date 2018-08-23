import React from 'react';
import { connect } from 'react-redux';
import Path from '../components/Path.jsx';
import AddPath from '../components/AddPath.jsx';
import * as actions from '../actions/actions.js'


const mapStateToProps = state => ({
  paths: state.paths.pathList,
  pathCount: state.paths.pathList.length,
  serial: state.paths.serial,
})

const mapDispatchToProps = {
  addPath: actions.addPath,
  updateStatus: actions.updateStatus,
  deletePath: actions.deletePath,
  updateNotes: actions.updateNotes
}

const PathContainer = ({ paths, serial, addPath, updateStatus, updateNotes, deletePath }) => {
  const pathComponents = paths.map((path, index) => {
    return (
      <Path 
        key={`${index}path${path.id}`}
        id={path.id}
        company={path.company}
        position={path.position}
        status={path.status}
        notes={path.notes}
        lastUpdated={path.lastUpdated}
        followUp={path.followUp}
        index={index}
        updateStatus={updateStatus}
        deletePath={deletePath}
        updateNotes={updateNotes}
      />
    )
  });

  return (
    <div id="path-container">
      <AddPath addPath={addPath} serial={serial}/>
      {pathComponents}
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(PathContainer)