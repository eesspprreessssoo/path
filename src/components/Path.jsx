import React from 'react';

const Path = ({ id, company, position, status, notes, lastUpdated, followUp }) => {
  const statuses = ['Watching', 'Applied', 'Phone Screen', 'On-Site', 'Offer', 'Accepted'];

  const statusDisplay = statuses.map(statusItem => {
    const complete = status.includes(statusItem);
    const completeStatus = {
      color: complete ? "#f00" : "#000"
    }
    return <span style={completeStatus}>statusItem</span>
  })

  return (
    <div>
      <div>
        <span>{position} at {company}</span>
      </div>
      <div>
        {statusDisplay}
        <button>Update</button>
      </div>
    </div>
  )
}

export default Path;