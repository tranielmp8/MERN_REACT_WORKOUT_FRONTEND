/* eslint-disable react/prop-types */
import { useContext } from "react";
import { WorkoutsContext } from "../context/WorkoutContext";
import { useAuthContext } from "../hooks/useAuthContext";

// date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";

export default function WorkoutDetails({workout}) {
  const { dispatch } = useContext(WorkoutsContext);
  const {user} = useAuthContext();

  const handleClick = async () => {
    if(!user) {
      return
    }

    const response = await fetch('https://mernnodeworkoutapi-production-ea55.up.railway.app/api/workouts/' + workout._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    
    const json = await response.json();

    if(response.ok) {
      dispatch({type: 'DELETE_WORKOUT', payload: json})
    }

  }

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p><strong>Load (lbs): </strong> {workout.load}</p>
      <p><strong>Set(s): </strong> X {workout.sets}</p>
      <p><strong>Reps: </strong>{workout.reps}</p>
      <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
      <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
    </div>
  )
}
