/* eslint-disable react/prop-types */
import { createContext, useEffect, useReducer } from "react";
import { authReducer } from "../hooks/authReducer";

export const AuthContext = createContext();

// we may need to up this in the AuthContextProvider function below or put in a new file


export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null
  })

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))

    if(user) {
      dispatch({type: 'LOGIN', payload: user})
    }
  }, [])

  console.log('AuthContext state: ', state)

  return (
    <AuthContext.Provider value={{...state, dispatch}} >
      { children }
    </AuthContext.Provider>
  )

}