import * as types from '../constants/actionTypes';

const initialState = {
  user: {
    name: 'User',
  },
  pathList: [],
  serial: 0,
};

// const path = {
//   id: "01",
//   company: "Google",
//   position: "Full-stack",
//   status: [
//     'Watching',
//     'Applied'
//   ],
//   notes: "",
//   lastUpdated: "",
//   followUp: ""
// }


const pathReducer = (state=initialState, action) => {
  let serial, pathList;

  switch(action.type) {
    case types.ADD_PATH: 
      serial = state.serial + 1; 
      // create new path object from provided data
      const newPath = action.payload;
      
      // push new path onto copy of path list
      pathList = state.pathList.slice();
      pathList.push(newPath);

      return {
        ...state, 
        pathList,
        serial,
      };
    
    case types.UPDATE_NOTES: 
      const { notes, pathID } = action.payload;
      pathList = state.pathList.map(path => {
        if (path.id === pathID) {
          return { ...path, notes };
        }
        return path;
      });

      return {
        ...state,
        pathList,
      };

    case types.UPDATE_STATUS: 
      const { status, lastUpdated, pathId } = action.payload;

      pathList = state.pathList.map(path => {
        if (path.id === pathId) {
          return { ...path, lastUpdated, status };
        }
        return path; 
      });

      return {
        ...state,
        pathList,
      };

    case types.DELETE_PATH: 
      pathList = state.pathList.slice();
      pathList.splice(action.payload, 1);

      return {
        ...state, 
        pathList,
      };

    default: 
      return state;
  }
}

export default pathReducer;