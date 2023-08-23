import styles from './Signup.module.css'

import React from 'react'
import { useState } from 'react'
import { useSignup } from '../../hooks/useSignup'

export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const { signup, isPending, error } = useSignup()

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(email, password, displayName)
    signup(email, password, displayName)
  }
    return (
        // <div className='content'>
        //     <h3>Signup</h3>
        // </div>
        <form onSubmit={handleSubmit} className={styles['signup-form']}>
        <h2>Sign up</h2>
        <label>
          <span>email:</span>
          <input 
            type="email" 
            onChange={(e) => setEmail(e.target.value)} 
            value={email}
          />
        </label>
        <label>
          <span>password:</span>
          <input 
            type="password" 
            onChange={(e) => setPassword(e.target.value)} 
            value={password} 
          />
        </label>
        <label>
          <span>display name:</span>
          <input 
            type="text" 
            onChange={(e) => setDisplayName(e.target.value)}
            value={displayName}
          />
        </label>
        { !isPending && <button className="btn">Sign up</button> }
        { isPending && <button className="btn" disabled>Loading...</button> }
         <br /> <br />
        { error && <p className='apperror'>{error}</p> }
      </form>
    )
}
