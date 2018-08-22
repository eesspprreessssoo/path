// import actionType constants
import * as types from '../constants/actionTypes'

// action creators 
export const addPath = path => ({
  type: types.ADD_PATH,
  payload: path,
});

export const updateStatus = (pathId, status) => ({
  type: types.UPDATE_STATUS,
  payload: { pathId, status },
});

export const updateNotes = (pathId, note) => ({
  type: types.UPDATE_NOTES,
  payload: { pathId, note },
});

export const deletepath = (pathIndex) => ({
  type: types.DELETE_PATH,
  payload: pathIndex,
})