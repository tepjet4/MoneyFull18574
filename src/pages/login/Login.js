import styles from './Login.module.css'

import React from 'react'
import { useState } from 'react'
import { useLogin } from '../../hooks/useLogin'
import { FaExpeditedssl } from 'react-icons/fa'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, error, isPending } = useLogin()

  const style = {
    color: 'blue', fontSize: '1.5em'
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(email, password)
    login(email, password)
  }
  return (
    // <div className='content'>
    //   <h3>Login</h3>
    // </div>
    <form onSubmit={handleSubmit} className={styles['login-form']}>
      <h2><FaExpeditedssl style={style} />&nbsp;&nbsp;Login</h2>
      <label>
        <span>Email:</span>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </label>
      <label>
        <span>Password:</span>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </label>
      {/* <button className="btn">Login</button> */}
      {!isPending && <button className="btn">Login</button>}
      {isPending && <button className="btn" disabled>loading</button>} <br /> <br />
      {error && <p className='apperror'>{error}</p>}
    </form>
  )
}

