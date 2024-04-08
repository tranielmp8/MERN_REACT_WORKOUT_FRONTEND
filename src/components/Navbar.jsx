import { Link } from "react-router-dom"
import { useLogout } from '../hooks/useLogout.js'
import { useAuthContext } from '../hooks/useAuthContext.js'

export default function Navbar() {
  const {logout} = useLogout()
  const { user } = useAuthContext()

  const handleClick = () => {
    logout();
  }

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>
            IFlex
            <span className="material-symbols-outlined weight">fitness_center</span>
          </h1>
        </Link>
        <nav>
          {user && (
          <div>
            <span>{user.email}</span>
            <button onClick={handleClick} >Log Out</button>
          </div>
          )}
          {!user && (
           <div>
            <Link to="/login" >Login</Link>
            <Link to="signup">Signup</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}
