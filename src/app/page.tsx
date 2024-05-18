'use client';
import { useRef, useState } from 'react';
import styles from './page.module.css'
import { Turnstile, TurnstileInstance } from '@marsidev/react-turnstile'; // <------------- Importing Turnstile component
 
const Home = () => {
 
  const [canSubmit, setCanSubmit] = useState(false); // <------------- We will use this state to enable submit button if Turnstile says all is well.
  const refTurnstile = useRef<TurnstileInstance>(null); // <------------- Ref to Turnstile component. We will use this to reset Turnstile after each submit.
 
  const handleSubmit = async () => {
    refTurnstile.current?.reset(); // <------------- After each submit, recycling turnstile for next usage.
    console.log('submitted!');
  }
 
  return (
    <div className={styles.pageCenter}>
      <form onSubmit={handleSubmit}>
        <div><input type="text" placeholder="username" /></div>
        <div><input type="password" placeholder="password" /></div>
        <div><button type='submit' disabled={!canSubmit}>Login</button></div>
        <br />
        <Turnstile
          id='turnstile-1'
          ref={refTurnstile}
          siteKey='YOUR_SITE_KEY'
          onSuccess={() => setCanSubmit(true)}
        />
      </form>
    </div>
  )
}
 
export default Home;