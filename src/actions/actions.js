// import actionType constants
import * as types from '../constants/actionTypes'

// action creators 
export const addPath = path => ({
  type: types.ADD_PATH,
  payload: path,
});

export const updateStatus = (pathId, status, lastUpdated) => ({
  type: types.UPDATE_STATUS,
  payload: { pathId, status, lastUpdated },
});

export const updateNotes = (pathID, notes) => ({
  type: types.UPDATE_NOTES,
  payload: { pathID, notes },
});

export const deletePath = (pathIndex) => ({
  type: types.DELETE_PATH,
  payload: pathIndex,
})