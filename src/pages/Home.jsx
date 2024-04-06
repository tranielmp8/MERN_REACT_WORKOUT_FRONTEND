import { useContext, useEffect } from "react"
// import { useWorkoutsContext } from "../hooks/useWorkoutsContext.js"
import { WorkoutsContext } from "../context/WorkoutContext.jsx";


// components
import WorkoutDetails from "../components/WorkoutDetails"
import WorkoutForm from "../components/WorkoutForm"

export default function Home() {
  // const [workouts, setWorkouts] = useState(null) will use React context here now since we set it up
  const { workouts, dispatch } = useContext(WorkoutsContext);//destructuring {} not like setting up useState

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch('http://localhost:4000/api/workouts')
      const json = await response.json();

      if(response.ok){
        dispatch({type: 'SET_WORKOUTS', payload: json})
      }
    }
    fetchWorkouts()
  }, [dispatch])

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
