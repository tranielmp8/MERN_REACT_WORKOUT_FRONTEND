import { WorkoutsContext } from "../context/WorkoutContext.jsx";
import { useContext } from "react";

export const useWorkoutsContext = () => {
  const context = useContext(WorkoutsContext) //the value we passed into <WorkoutsContext.Provider/>

  if(!context) {
    throw Error('useWorkoutsContext must be used inside an WorkoutsContextProvider')
  }
}