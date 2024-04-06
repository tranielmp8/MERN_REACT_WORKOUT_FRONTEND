// all this is to keep the local state in sync with the backend database
import { createContext, useReducer } from "react";

export const WorkoutsContext = createContext(); // make sure to export this

// export const workoutsReducer = (state, action) => {
//   switch(action.type) {
//     case 'SET_WORKOUTS':
//       return {
//         workouts: action.payload
//       }
//     case 'CREATE_WORKOUT':
//       return {
//         workouts: [action.payload, ...state.workouts]
//       }
//       default:
//         return state //just return the state unchanged
//   }
// }
// dispatch({type: 'SET_WORKOUTS', payload: [{}, {}]}) <-- action
// workouts: null <-- state

// eslint-disable-next-line react/prop-types
export const WorkoutsContextProvider = ({children}) => {
  const workoutsReducer = (state, action) => {
    switch(action.type) {
      case 'SET_WORKOUTS':
        return {
          workouts: action.payload
        }
      case 'CREATE_WORKOUT':
        return {
          workouts: [action.payload, ...state.workouts]
        }
      case 'DELETE_WORKOUT':
        return {
          workouts: state.workouts.filter((workout) => workout._id !== action.payload._id )
        }
      default:
        return state //just return the state unchanged
    }
  }

  const [state, dispatch] = useReducer(workoutsReducer, {
    workouts: null
  });


  return (// children is the App component that was wrapped in main.jsx file
    <WorkoutsContext.Provider value={{...state, dispatch}}>
      {children} 
    </WorkoutsContext.Provider>
  )
}