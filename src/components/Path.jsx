import React from 'react';

const Path = ({ id, index, company, position, status, notes, lastUpdated, followUp, updateStatus, updateNotes, deletePath }) => {
  const statuses = ['Watching', 'Applied', 'Phone Screen', 'On-Site', 'Offer', 'Accepted'];

  const statusDisplay = statuses.map(statusItem => {
    const complete = status.includes(statusItem);
    const completeStatus = {
      color: complete ? "#000" : "#ccc",
      padding: "0px 20px 0px 20px",
      border: complete ? "1px solid black" :  "1px solid #ccc",
      backgroundColor: complete ?  "#cfc" : "#FFF",
      flexGrow: 1,
    }

    return <span key={statusItem+id} style={completeStatus}>{statusItem}</span>
  })

  const submitStatus = () => {
    const newStatus = statuses.slice(0, status.length + 1)
    updateStatus(id, newStatus, new Date())
  }

  const submitDelete = () => {
    deletePath(index)
  }

  const changeNotes = (e) => {
    updateNotes(id, e.target.value)
  }

  return (
    <div>
      <div className="gray-bg">
        <span>{position} at {company}</span>
        <button onClick={submitDelete} className="right">Delete</button>
        <span className="right">Last Updated: {JSON.stringify(lastUpdated)}</span>
      </div>
      <div>
        
        <button onClick={submitStatus} id="status-button">{statusDisplay}</button>
      </div>
      <div>
        <input className="notes" type="text" value={notes} onChange={changeNotes} />
      </div>
    </div>
  )
}

export default Path;