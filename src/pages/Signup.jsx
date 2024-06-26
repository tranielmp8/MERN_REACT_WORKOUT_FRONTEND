import { useState } from "react"
import { useSignup } from "../hooks/useSignup";

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    await signup(email, password)
  }

  return (
    <div>
      <form action="" className="signup" onSubmit={handleSubmit}>
        <h3>Sign Up!</h3>

        <label htmlFor="">Email: </label>
        <input 
          type="email" 
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />

        <label htmlFor="">Password: </label>
        <input 
          type="password" 
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />

        <button disabled={isLoading} >Signup</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  )
}
