import { AuthContext } from "../context/AuthContext.jsx";
import { useContext } from "react";

export const useAuthContext = () => {
  const context = useContext(AuthContext) //the value we passed into <WorkoutsContext.Provider/>

  if(!context) {
    throw Error('useAuthContext must be used inside an AuthContextProvider')
  }

  return context
}