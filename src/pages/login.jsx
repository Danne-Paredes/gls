import {auth, provider} from '../config/firebase'
import { signInWithPopup } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import GoogleButton from 'react-google-button'
import logo from '../images/KV-Logo.png'
import styles from '../App.module.css';

export const Login = ()=> {
  const navigate = useNavigate();
  const signInWithGoogle = async () =>{
    const result = await signInWithPopup(auth,provider);
    console.log(result);
    navigate('/input-engine');
  }

  return (
    <div>
      <div className={styles.logoCard}>
        <img src={logo} alt="Logo" className={styles.logo}/>
        <p>Please login with your Knighted Account</p>
        <GoogleButton onClick={signInWithGoogle} className={styles.gButton}/>
      </div>
    </div>
  )
}
