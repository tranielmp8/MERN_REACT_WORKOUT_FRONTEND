import { useAuthContext } from "./useAuthContext"
import { useWorkoutsContext } from './useWorkoutsContext'


export const useLogout = () => {
  // update local state and delete the token
  const { dispatch } = useAuthContext();
  const { dispatch: workoutsDispatch } = useWorkoutsContext();

  const logout = () => {
    // remove user from storage
    localStorage.removeItem('user')

    // dispatch logout action
    dispatch({type: 'LOGOUT'})
    workoutsDispatch({type: 'SET_WORKOUTS', payload: null})
  }

  return {logout}
}