import { useContext, useEffect } from "react"
// import { useWorkoutsContext } from "../hooks/useWorkoutsContext.js"
import { WorkoutsContext } from "../context/WorkoutContext.jsx";
import { useAuthContext } from "../hooks/useAuthContext.js";


// components
import WorkoutDetails from "../components/WorkoutDetails"
import WorkoutForm from "../components/WorkoutForm"

export default function Home() {
  const { workouts, dispatch } = useContext(WorkoutsContext);
  const {user} = useAuthContext()

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch('https://mern-node-workout-api.onrender.com/api/workouts', {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      const json = await response.json();

      if(response.ok){
        dispatch({type: 'SET_WORKOUTS', payload: json})
      }
    }

    if (user) {
    fetchWorkouts()
    }
  }, [dispatch, user])

  return (
    <div className='home'>
      <div className="workouts">
        {workouts && workouts.map((workout) => (
          <WorkoutDetails workout={workout} key={workout._id} />
        ))}
      </div>
      <WorkoutForm />
    </div>
  )
}
