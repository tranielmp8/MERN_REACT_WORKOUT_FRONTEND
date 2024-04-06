import { useContext, useState } from "react"
import { WorkoutsContext } from "../context/WorkoutContext"


export default function WorkoutForm() {
  const { dispatch } = useContext(WorkoutsContext)
  const [title, setTitle] = useState('')
  const [load, setLoad] = useState('')
  const [reps, setReps] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmpytFields] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault();

    const workout = {
      title, 
      load,
      reps
    }

    const response = await fetch('http://localhost:4000/api/workouts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(workout)
    })
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmpytFields(json.emptyFields)
    }
    if(response.ok) {
      setTitle('')
      setLoad('')
      setReps('')
      setError(null);
      setEmpytFields([])
      console.log('New workout added')
      dispatch({type: 'CREATE_WORKOUT', payload: json})
    }

  }

  return (
    <div>
      <form action="" className="create" onSubmit={handleSubmit}>
        <h3>Add a new workout</h3>
        <label htmlFor="">
          Exercise Title:
        </label>
        <input 
          type="text" 
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          className={emptyFields.includes('title') ? 'error' : ''}
        />

        <label htmlFor="">
          Load (lbs):
        </label>
        <input 
          type="number" 
          onChange={(e) => setLoad(e.target.value)}
          value={load}
          className={emptyFields.includes('load') ? 'error' : ''}

        />

        <label htmlFor="">
          Reps:
        </label>
        <input 
          type="number" 
          onChange={(e) => setReps(e.target.value)}
          value={reps}
          className={emptyFields.includes('reps') ? 'error' : ''}

        />

        <button>Add Workout</button>
        {error && <div>{error}</div>}
      </form>
    </div>
  )
}
