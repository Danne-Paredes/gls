import { Link } from 'react-router-dom'
import { auth } from '../config/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import styles from '../App.module.css';

export function Navbar() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const signUserOut = async () => {
    await signOut(auth)
    navigate('/');
  }
  
  return (
    <div>
      {user && (
        <>
          <ul className={styles.navbar}>
            <li><img src={user?.photoURL || ""} width={100} height={100} alt=""/>
              <button onClick={signUserOut}>Logout</button></li>
            <li><p>{user?.displayName}</p></li>
            <li><Link to={"/casino-status"}>Casino Status</Link></li>
            <li><Link to={"/input-engine"}>Input Engine</Link></li>
            
            
          </ul>
        </>
      )}
    </div>
  )
}