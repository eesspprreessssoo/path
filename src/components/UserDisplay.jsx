import React from 'react';

const UserDisplay = ({ name, pathCount }) => (
  <div id="user-display">
    <span>Hello {name}!</span>
    <span>Total Paths: {pathCount}</span>
  </div>
)

export default UserDisplay;